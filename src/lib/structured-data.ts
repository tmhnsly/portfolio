import type { BlogPost, Discipline, MediaItem, Project } from '@/types';
import { COPY, SITE } from '@/data';
import { DISCIPLINES } from './disciplines';
import { SITE_URL, absUrl as abs } from './site-url';
import { youTubeEmbedUrl, youTubeThumbnail } from './youtube';
import { projectHref, postHref } from './routes';

type YouTubeItem = Extract<MediaItem, { type: 'youtube' }>;
type JsonLdNode = Record<string, unknown>;

// Stable @ids so every page's content nodes can point back to one Person/WebSite
// entity (Google's Knowledge Graph + LLMs resolve the references into one identity).
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PERSON_REF = { '@id': PERSON_ID };

// Curated, truthful `knowsAbout`: the real dev stack (breadth proves the
// "specialist but adaptable" claim) plus the two professional creative practices.
// Editorial, so spelled out rather than dumping the full tag registry.
const KNOWS_ABOUT = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'SCSS', 'Tailwind CSS',
  'Web accessibility', 'Web performance', 'Sanity CMS', 'Storybook', 'REST APIs', 'PHP', 'MySQL', 'MongoDB',
  'Audio production', 'Video production',
];

// Services he can be hired for — frontend/full-stack lead, audio/video as real
// professional offerings (not "side projects").
const SERVICES = ['Frontend development', 'Full-stack web development', 'Audio production', 'Video production'];

/** A project's description for metadata + structured data, with the shared
    discipline fallback when frontmatter omits `desc`. */
export function projectDescription(project: Project): string {
  return project.desc ?? `${DISCIPLINES[project.discipline].label} work by Tom Hinsley.`;
}

export interface ProjectVideo {
  title: string;
  thumbnailUrl: string;
  embedUrl: string;
  description: string;
}

/** The YouTube videos in a project, resolved once to the facts both the on-page
    VideoObject and the video sitemap need (so the two never drift). The thumbnail
    is the project's custom `poster`, else the hosted YouTube still. */
export function projectVideos(project: Project): ProjectVideo[] {
  const description = projectDescription(project);
  return project.media
    .filter((m): m is YouTubeItem => m.type === 'youtube')
    .map((m) => ({
      title: m.title ?? project.title,
      thumbnailUrl: abs(m.poster ?? youTubeThumbnail(m.id)),
      embedUrl: youTubeEmbedUrl(m.id, { list: m.list }),
      description,
    }));
}

function personNode(): JsonLdNode {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.name,
    url: SITE_URL,
    image: abs('/images/about/tom-hinsley.webp'),
    jobTitle: ['Full-Stack Developer', 'Frontend Developer', 'Software Engineer'],
    description: COPY.meta.summary,
    address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: 'en-GB',
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Ravensbourne University London' },
    // Profiles that corroborate the entity. No email: the address is deliberately
    // kept out of the HTML (base64-encoded client-side — see src/lib/email.ts).
    sameAs: SITE.socials.map((s) => s.href),
    seeks: { '@type': 'Demand', name: 'Permanent roles and freelance or contract software development work' },
    makesOffer: SERVICES.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full-Stack Developer',
      occupationLocation: { '@type': 'City', name: 'London' },
      skills: 'React, Next.js, TypeScript, full-stack web development, accessibility',
    },
  };
}

function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE.name,
    description: COPY.meta.description,
    inLanguage: 'en-GB',
    publisher: PERSON_REF,
  };
}

/**
 * Sitewide identity graph (Person + WebSite) — the entity Google's Knowledge
 * Graph and assistant search anchor to. Rendered once in the root layout, so
 * every page reinforces it.
 */
export function identityGraphJsonLd(): JsonLdNode {
  return { '@context': 'https://schema.org', '@graph': [personNode(), websiteNode()] };
}

/**
 * VideoObject JSON-LD for every YouTube item in a project. The hero embed is a
 * click-to-play facade, so the player never enters the crawled DOM and Google
 * can't infer a thumbnail — this hands it one explicitly, fixing the Search
 * Console "No thumbnail URL provided" video-indexing error. Returns null when a
 * project has no video, so the page can skip the script entirely.
 */
export function projectVideoJsonLd(project: Project): JsonLdNode[] | null {
  const videos = projectVideos(project);
  if (videos.length === 0) return null;
  // Google wants uploadDate as a full ISO 8601 datetime WITH a timezone; the
  // frontmatter date is date-only, so anchor it to midnight UTC (clears the
  // "invalid datetime"/"missing timezone" non-critical warnings).
  const uploadDate = `${project.date}T00:00:00Z`;
  return videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.description,
    thumbnailUrl: v.thumbnailUrl,
    uploadDate,
    embedUrl: v.embedUrl,
  }));
}

/** CreativeWork JSON-LD for a project page (sibling to any VideoObject above). */
export function projectCreativeWorkJsonLd(project: Project): JsonLdNode {
  const url = abs(projectHref(project.discipline, project.slug));
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: projectDescription(project),
    datePublished: project.date,
    author: PERSON_REF,
    image: abs(`${projectHref(project.discipline, project.slug)}/opengraph-image`),
    url,
    keywords: project.tags.join(', '),
    inLanguage: 'en-GB',
  };
}

/** BlogPosting JSON-LD for a post — makes the post citeable in AI answers. */
export function blogPostingJsonLd(post: BlogPost): JsonLdNode {
  const url = abs(postHref(post.slug));
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: PERSON_REF,
    publisher: PERSON_REF,
    image: abs(`${postHref(post.slug)}/opengraph-image`),
    url,
    mainEntityOfPage: url,
    keywords: post.tags.join(', '),
    inLanguage: 'en-GB',
  };
}

/** BreadcrumbList JSON-LD from an ordered trail of name/url pairs. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

// ── Breadcrumb trails: defined once so every page's BreadcrumbList agrees ──
const HOME_CRUMB = { name: 'Home', url: '/' };
const disciplineCrumb = (d: Discipline) => ({ name: DISCIPLINES[d].label, url: DISCIPLINES[d].route });

export const disciplineCrumbs = (d: Discipline) => [HOME_CRUMB, disciplineCrumb(d)];
export const projectCrumbs = (project: Project) => [
  HOME_CRUMB,
  disciplineCrumb(project.discipline),
  { name: project.title, url: projectHref(project.discipline, project.slug) },
];
export const postCrumbs = (post: BlogPost) => [
  HOME_CRUMB,
  { name: 'Blog', url: '/blog' },
  { name: post.title, url: postHref(post.slug) },
];

/** FAQPage JSON-LD from visible Q&A (the answers are rendered on the page too). */
export function faqJsonLd(items: readonly { q: string; a: string }[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}
