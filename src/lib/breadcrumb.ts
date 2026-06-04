import type { Discipline } from '@/types';
import type { BreadcrumbData } from '@/lib/content';
import { DISCIPLINES } from '@/lib/disciplines';
import { disciplineFromPath } from '@/lib/zone';

export interface Crumb {
  slot: 'home' | 'section' | 'leaf';
  label: string;
  href?: string;
  count?: number;
  unit?: string;
}

/** Title-case a URL slug: `agile-energy-dashboard` → `Agile Energy Dashboard`. */
export const humanize = (slug: string) =>
  slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

/**
 * Build the breadcrumb trail from a pathname: Home / Section (· N projects) / Leaf.
 * Pure — the single source of the trail rules (counts, plural noun, the title-map
 * fallback to a humanized slug, the about/blog special-cases).
 *
 * `discipline` defaults to deriving it from the pathname (so the function stays
 * self-contained and testable with just a pathname), but the Shell — which owns
 * the Zone and has already resolved the discipline — passes it in so the
 * pathname→Discipline derivation happens once per route.
 */
export function buildCrumbs(
  pathname: string,
  { titleMap, projectCounts, postCount }: BreadcrumbData,
  discipline: Discipline | undefined = disciplineFromPath(pathname),
): Crumb[] {
  const segs = pathname.split('/').filter(Boolean);
  const home: Crumb = { slot: 'home', label: 'Home', href: segs.length ? '/' : undefined };
  if (segs.length === 0) return [home];

  const first = segs[0]!; // segs is non-empty here (guarded above)
  if (first === 'about') return [home, { slot: 'section', label: 'About' }];

  if (discipline) {
    const label = DISCIPLINES[discipline].label;
    if (segs.length === 1) {
      const count = discipline === 'blog' ? postCount : projectCounts[discipline] ?? 0;
      const noun = discipline === 'blog' ? 'post' : 'project';
      return [home, { slot: 'section', label, count, unit: `${noun}${count === 1 ? '' : 's'}` }];
    }
    const leafSeg = segs[1]!; // segs.length >= 2 here (length === 1 returned above)
    const path = `/${discipline}/${leafSeg}`;
    return [
      home,
      { slot: 'section', label, href: `/${discipline}` },
      { slot: 'leaf', label: titleMap[path] ?? humanize(leafSeg) },
    ];
  }
  return [home, { slot: 'section', label: humanize(first) }];
}
