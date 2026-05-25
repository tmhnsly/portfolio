import type { Discipline, DisciplineMeta } from '@/types';

/**
 * Each discipline maps to a Radix hue. Colours are emitted as CSS vars
 * (`var(--{hue}-N)`) so they theme-swap with the Radix light/dark scales —
 * step 9 = solid fill (pills/nav/bloom), step 11 = legible coloured text
 * (periods/links), per the Radix scale. To recolour a discipline, change its
 * hue here AND import that hue's scale in `src/app/layout.tsx`.
 * blog uses `tomato` = the primary brand accent.
 */
const HUE: Record<Discipline, string> = {
  code: 'green',
  music: 'teal',
  sound: 'blue',
  photo: 'yellow',
  video: 'orange',
  blog: 'tomato',
};

const LABEL: Record<Discipline, string> = {
  code: 'Code', music: 'Music', sound: 'Sound', photo: 'Photo', video: 'Video', blog: 'Blog',
};

/** Hues whose step-9 solid is light → need DARK text on the pill (else white). */
const LIGHT_SOLID = new Set(['yellow', 'amber', 'orange', 'gold', 'lime', 'mint', 'sky']);

function meta(slug: Discipline): DisciplineMeta {
  const h = HUE[slug];
  return {
    slug,
    label: LABEL[slug],
    color: `var(--${h}-9)`,
    ink: `var(--${h}-11)`,
    onAccent: LIGHT_SOLID.has(h) ? 'var(--gray-12)' : 'var(--white-a12)',
    gradient: `linear-gradient(135deg, var(--${h}-8), var(--${h}-12))`,
    swatches: [`var(--${h}-6)`, `var(--${h}-9)`, `var(--${h}-12)`],
    route: `/${slug}`,
  };
}

export const DISCIPLINE_ORDER: Discipline[] = ['code', 'video', 'photo', 'music', 'sound', 'blog'];

export const DISCIPLINES = Object.fromEntries(
  (Object.keys(HUE) as Discipline[]).map((d) => [d, meta(d)]),
) as Record<Discipline, DisciplineMeta>;

export const isDiscipline = (s: string): s is Discipline =>
  Object.prototype.hasOwnProperty.call(DISCIPLINES, s);
