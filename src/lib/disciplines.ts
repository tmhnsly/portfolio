import type { Discipline, DisciplineMeta } from '@/types';

/**
 * Each discipline maps to a Radix hue. Colours are emitted as CSS vars
 * (`var(--{hue}-N)`) so they theme-swap with the Radix light/dark scales —
 * step 9 = solid fill (pills/nav/bloom), step 11 = legible coloured text
 * (periods/links), per the Radix scale. To recolour a discipline, change its
 * hue here AND import that hue's scale in `src/app/layout.tsx`.
 * code uses `tomato` = the primary brand accent.
 */
const HUE: Record<Discipline, string> = {
  code: 'tomato',
  audio: 'blue',
  video: 'green',
  blog: 'orange',
};

const LABEL: Record<Discipline, string> = {
  code: 'Code', audio: 'Audio', video: 'Video', blog: 'Blog',
};

/** Radix step-9 solids designed for DARK foreground text (all others take white).
    Per the Radix docs this is EXACTLY: sky, mint, lime, yellow, amber. (orange-9
    and gold-9 take WHITE text — they were wrongly included before, which gave the
    video/orange pill dark text.) */
const LIGHT_SOLID = new Set(['sky', 'mint', 'lime', 'amber']);

function meta(slug: Discipline): DisciplineMeta {
  const h = HUE[slug];
  return {
    slug,
    label: LABEL[slug],
    color: `var(--${h}-9)`,
    ink: `var(--${h}-11)`,
    // Radix: step-9 solids take white OR black text. Use FIXED black/white
    // (alpha scales, theme-independent) — NOT --gray-12, which flips to light in
    // dark mode and would break the text on a bright (yellow/orange) pill there.
    onAccent: LIGHT_SOLID.has(h) ? 'var(--black-a12)' : 'var(--white-a12)',
    gradient: `linear-gradient(135deg, var(--${h}-8), var(--${h}-12))`,
    swatches: [`var(--${h}-6)`, `var(--${h}-9)`, `var(--${h}-12)`],
    route: `/${slug}`,
  };
}

export const DISCIPLINE_ORDER: Discipline[] = ['code', 'video', 'audio', 'blog'];

export const DISCIPLINES = Object.fromEntries(
  (Object.keys(HUE) as Discipline[]).map((d) => [d, meta(d)]),
) as Record<Discipline, DisciplineMeta>;

export const isDiscipline = (s: string): s is Discipline =>
  Object.prototype.hasOwnProperty.call(DISCIPLINES, s);
