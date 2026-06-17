import type { BlogPost } from '@/types';
import { formatMonthYear, readingLabel } from './format';
import { postHref } from './routes';

/**
 * The display facts a Post card shows — its route, the formatted date, the
 * reading-time label, and the category — resolved once. The blog surfaces (index
 * list, featured, post hero, related) otherwise each re-run formatMonthYear /
 * readingLabel, so a format change touched every card with no locality. Mirrors
 * `projectPresentation` for Projects; pure over a Post, so "what a card shows" is
 * a table test rather than a render test.
 */
export interface PostPresentation {
  href: string; // route to the post
  date: string; // formatMonthYear(post.date) — e.g. "Jun 2026"
  reading: string; // readingLabel(post.readingTime) — e.g. "6 min read"
  category: string; // the post's category, as-is
}

export function postPresentation(post: BlogPost): PostPresentation {
  return {
    href: postHref(post.slug),
    date: formatMonthYear(post.date),
    reading: readingLabel(post.readingTime),
    category: post.category,
  };
}
