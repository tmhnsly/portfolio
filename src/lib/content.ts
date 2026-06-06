import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { projectFrontmatterSchema, postFrontmatterSchema, parseFrontmatter } from './schemas';
import type { Project, BlogPost, Author, Discipline } from './schemas';
import { splitFeatured } from './facets';
import { projectHref, postHref } from './routes';

const ROOT = path.join(process.cwd(), 'content');
const AUTHOR: Author = {
  name: 'Tom Hinsley',
  role: 'A digital creative in London',
  bio: 'A digital creative in London. Mostly writes about code, sometimes about everything else.',
};
const WORDS_PER_MIN = 220;
const estimateReading = (body: string) => Math.max(1, Math.round(body.split(/\s+/).length / WORDS_PER_MIN));

function read(sub: string, file: string) {
  const raw = fs.readFileSync(path.join(ROOT, sub, file), 'utf8');
  return { slug: file.replace(/\.md$/, ''), ...matter(raw) };
}
function listMd(sub: string) {
  return fs.readdirSync(path.join(ROOT, sub)).filter((f) => f.endsWith('.md'));
}

/* ── Corpus: read + Zod-parse + date-desc sort ONCE, then memoise. Content is
   static at build, so callers (and the queries below) share one parsed array
   instead of re-reading the markdown on every call. Callers never mutate.
   In dev we re-read on every call instead: markdown files aren't part of the
   module graph, so adding/editing one wouldn't show until a server restart. ── */
const DEV = process.env.NODE_ENV !== 'production';
let _projects: Project[] | null = null;
let _posts: BlogPost[] | null = null;

function loadProjects(): Project[] {
  return listMd('projects')
    .map((file) => {
      const { slug, data, content } = read('projects', file);
      return { ...parseFrontmatter(projectFrontmatterSchema, data, `content/projects/${file}`), slug, body: content };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
function loadPosts(): BlogPost[] {
  return listMd('blog')
    .map((file) => {
      const { slug, data, content } = read('blog', file);
      const fm = parseFrontmatter(postFrontmatterSchema, data, `content/blog/${file}`);
      return { ...fm, slug, body: content, readingTime: fm.readingTime ?? estimateReading(content), author: AUTHOR };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllProjects(): Project[] {
  return DEV ? loadProjects() : (_projects ??= loadProjects());
}
export function getAllPosts(): BlogPost[] {
  return DEV ? loadPosts() : (_posts ??= loadPosts());
}
export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
/** A Project resolved only if it actually lives in the given Discipline — the
    `/[discipline]/[slug]` guard shared by the project page, its metadata, and its
    OG card (a slug under the wrong discipline route is a 404, not a redirect). */
export function getProjectInDiscipline(discipline: string, slug: string): Project | undefined {
  const project = getProject(slug);
  return project && project.discipline === discipline ? project : undefined;
}
export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** The home "featured deck": a curated, explicitly-ordered subset for the carousel
    — distinct from the `featured`-flag selection below (this one is hand-ordered,
    not flag-driven). Edit DECK_LEAD to change which projects open the deck. Exported
    so a test can assert every lead slug still resolves (a stale slug is otherwise
    silently dropped at line below). */
export const DECK_LEAD = ['chork', 'tv-bland'];
export function featuredProjects(n = 4): Project[] {
  const all = getAllProjects();
  const lead = DECK_LEAD.map((slug) => all.find((p) => p.slug === slug)).filter((p): p is Project => !!p);
  const seen = new Set(lead.map((p) => p.slug));
  return [...lead, ...all.filter((p) => !seen.has(p.slug))].slice(0, n);
}

/** The blog index's lead Post + the remainder. The "which leads" rule is the one
    shared `splitFeatured` seam (a `featured`-flagged Post, else the most recent),
    so the page never hand-rolls the split and stays consistent with RecentWork. */
export function featuredPost(): { featured?: BlogPost; rest: BlogPost[] } {
  return splitFeatured(getAllPosts(), Number.POSITIVE_INFINITY);
}

/* ── Queries: the questions pages actually ask, answered here once (sort order,
   neighbour and "related" rules live behind this seam, not in each page). ── */

/** All projects in a discipline (date-desc, like the corpus). */
export function projectsInDiscipline(discipline: Discipline): Project[] {
  return getAllProjects().filter((p) => p.discipline === discipline);
}

/** The previous/next project within the same discipline (date-desc order),
    wrapping around so the ends loop back rather than dead-ending. */
export function projectNeighbours(slug: string): { prev?: Project; next?: Project } {
  const project = getProject(slug);
  if (!project) return {};
  const list = projectsInDiscipline(project.discipline);
  const i = list.findIndex((p) => p.slug === slug);
  if (i < 0 || list.length < 2) return {};
  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}

/** Projects related to `slug`: same discipline first (excl. itself), then topped
    up to `n` with the most-recent projects from other disciplines. */
export function relatedProjects(slug: string, n = 3): Project[] {
  const project = getProject(slug);
  if (!project) return [];
  const all = getAllProjects();
  const sameDiscipline = all.filter((p) => p.slug !== slug && p.discipline === project.discipline);
  if (sameDiscipline.length >= n) return sameDiscipline.slice(0, n);
  const others = all.filter((p) => p.slug !== slug && p.discipline !== project.discipline);
  return [...sameDiscipline, ...others].slice(0, n);
}

/** The newer/older post around `slug` (date-desc order → newer is earlier). */
export function postNeighbours(slug: string): { newer?: BlogPost; older?: BlogPost } {
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  if (i < 0) return {};
  return {
    newer: i > 0 ? all[i - 1] : undefined,
    older: i < all.length - 1 ? all[i + 1] : undefined,
  };
}

/** The most-recent posts excluding `slug`. */
export function relatedPosts(slug: string, n = 3): BlogPost[] {
  return getAllPosts().filter((p) => p.slug !== slug).slice(0, n);
}

/** Project count per discipline (for the breadcrumb section meta). */
export function disciplineCounts(): Partial<Record<Discipline, number>> {
  const counts: Partial<Record<Discipline, number>> = {};
  for (const p of getAllProjects()) counts[p.discipline] = (counts[p.discipline] ?? 0) + 1;
  return counts;
}

/** Path → title for every project/post leaf (for the breadcrumb leaf label). */
export function titleMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const p of getAllProjects()) map[projectHref(p.discipline, p.slug)] = p.title;
  for (const p of getAllPosts()) map[postHref(p.slug)] = p.title;
  return map;
}

/** Total number of blog posts. */
export function postCount(): number {
  return getAllPosts().length;
}

/** The most-used tags within a discipline (its projects; posts for blog), most
    frequent first. Powers the discipline cards + About "what I work with" so they
    reflect the real work rather than a hand-maintained list. */
export function topTagsByDiscipline(discipline: Discipline, limit = 8): string[] {
  const items = discipline === 'blog' ? getAllPosts() : projectsInDiscipline(discipline);
  const counts = new Map<string, number>();
  for (const it of items) for (const t of it.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([t]) => t);
}

/** Everything the persistent Breadcrumb needs, bundled. Built in the (server)
    layout and threaded through the Shell to the (client) Breadcrumb — see
    docs/adr/0001-breadcrumb-data-via-shell.md. */
export interface BreadcrumbData {
  projectCounts: Partial<Record<Discipline, number>>;
  titleMap: Record<string, string>;
  postCount: number;
}
export function breadcrumbData(): BreadcrumbData {
  return { projectCounts: disciplineCounts(), titleMap: titleMap(), postCount: postCount() };
}
