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
 */
export function buildCrumbs(
  pathname: string,
  { titleMap, projectCounts, postCount }: BreadcrumbData,
): Crumb[] {
  const segs = pathname.split('/').filter(Boolean);
  const home: Crumb = { slot: 'home', label: 'Home', href: segs.length ? '/' : undefined };
  if (segs.length === 0) return [home];

  const first = segs[0];
  if (first === 'about') return [home, { slot: 'section', label: 'About' }];

  const discipline: Discipline | undefined = disciplineFromPath(pathname);
  if (discipline) {
    const label = DISCIPLINES[discipline].label;
    if (segs.length === 1) {
      const count = discipline === 'blog' ? postCount : projectCounts[discipline] ?? 0;
      const noun = discipline === 'blog' ? 'post' : 'project';
      return [home, { slot: 'section', label, count, unit: `${noun}${count === 1 ? '' : 's'}` }];
    }
    const path = `/${discipline}/${segs[1]}`;
    return [
      home,
      { slot: 'section', label, href: `/${discipline}` },
      { slot: 'leaf', label: titleMap[path] ?? humanize(segs[1]) },
    ];
  }
  return [home, { slot: 'section', label: humanize(first) }];
}
