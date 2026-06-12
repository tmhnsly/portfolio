import type { Discipline } from '@/types';

/**
 * Canonical route shapes for content items. The Project route couples a
 * Discipline with a slug (`/[discipline]/[slug]`); the Post route lives under
 * `/blog`. Kept here so the URL shape is defined once and every link, sitemap
 * entry, and metadata path agrees.
 */
// Path segments are URL-encoded: a slug is its markdown filename, so encoding keeps
// the URL well-formed and closes the CodeQL stored-XSS path. (The leading `/` already
// forces a same-origin path, never a `javascript:` scheme — encoding is defence-in-depth
// and a no-op for the kebab-case slugs we actually ship.)
export const projectHref = (discipline: Discipline, slug: string): string =>
  `/${encodeURIComponent(discipline)}/${encodeURIComponent(slug)}`;
export const postHref = (slug: string): string => `/blog/${encodeURIComponent(slug)}`;
