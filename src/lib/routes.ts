import type { Discipline } from '@/types';

/**
 * Canonical route shapes for content items. The Project route couples a
 * Discipline with a slug (`/[discipline]/[slug]`); the Post route lives under
 * `/blog`. Kept here so the URL shape is defined once and every link, sitemap
 * entry, and metadata path agrees.
 */
export const projectHref = (discipline: Discipline, slug: string): string => `/${discipline}/${slug}`;
export const postHref = (slug: string): string => `/blog/${slug}`;
