import { tomato, blue, green, orange } from '@radix-ui/colors';
import type { Discipline } from '@/types';
import { HUE } from '@/lib/disciplines';

/**
 * The fixed-hex palette the Open Graph cards paint with. satori can't read the
 * app's CSS custom properties, so the cards rebuild each Discipline's colour from
 * Radix hexes — but DERIVED from the same `HUE` map the live app themes with, so
 * the cards can't silently drift from the site. To recolour a Discipline you edit
 * `HUE` (lib/disciplines) once; if it names a new hue, add that hue's Radix scale
 * to SCALES below (a missing scale throws loudly at build instead of mis-rendering).
 *
 * solid = step-9 (monogram tile), ink = step-11 (accent period + eyebrow dot),
 * bloom = step-5 (the soft corner glow).
 */
export type Palette = { solid: string; ink: string; bloom: string };

const SCALES: Record<string, Record<string, string>> = { tomato, blue, green, orange };

function palette(hue: string): Palette {
  const scale = SCALES[hue];
  if (!scale) throw new Error(`og-palette: no Radix scale imported for hue "${hue}" — add it to SCALES`);
  return { solid: scale[`${hue}9`]!, ink: scale[`${hue}11`]!, bloom: scale[`${hue}5`]! };
}

const PALETTE = Object.fromEntries(
  (Object.keys(HUE) as Discipline[]).map((d) => [d, palette(HUE[d])]),
) as Record<Discipline, Palette>;

export const ogAccent = (d: Discipline): Palette => PALETTE[d];
