import type { BlogPost, MediaItem, Project } from '@/types';
import { COPY, SITE } from '@/data';
import { DISCIPLINES } from './disciplines';
import { SITE_URL } from './site-url';
import { youTubeEmbedUrl, youTubeThumbnail } from './youtube';
import { projectHref, postHref } from './routes';

type YouTubeItem = Extract<MediaItem, { type: 'youtube' }>;
type JsonLdNode = Record<string, unknown>;

const abs = (path: string): string => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

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

function personNode(): JsonLdNode {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.name,
    url: SITE_URL,
    image: abs('/images/tom-hinsley.jpg'),
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
 * can't infer a thumbnail — this hands it one explicitly (the project's `poster`,
 * else the hosted YouTube still), fixing the Search Console "No thumbnail URL
 * provided" video-indexing error. Returns null when a project has no video, so
 * the page can skip the script entirely.
 */
export function projectVideoJsonLd(project: Project): JsonLdNode[] | null {
  const videos = project.media.filter((m): m is YouTubeItem => m.type === 'youtube');
  if (videos.length === 0) return null;
  const description = project.desc ?? `${DISCIPLINES[project.discipline].label} work by Tom Hinsley.`;
  return videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title ?? project.title,
    description,
    thumbnailUrl: abs(v.poster ?? youTubeThumbnail(v.id)),
    uploadDate: project.date,
    embedUrl: youTubeEmbedUrl(v.id, { list: v.list }),
  }));
}

/** CreativeWork JSON-LD for a project page (sibling to any VideoObject above). */
export function projectCreativeWorkJsonLd(project: Project): JsonLdNode {
  const url = abs(projectHref(project.discipline, project.slug));
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.desc ?? `${DISCIPLINES[project.discipline].label} work by Tom Hinsley.`,
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
