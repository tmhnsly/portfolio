import { describe, it, expect } from 'vitest';
import { tomato, blue, green, orange } from '@radix-ui/colors';
import { HUE } from '@/lib/disciplines';
import { ogAccent } from '@/lib/og-palette';
import type { Discipline } from '@/types';

const SCALES: Record<string, Record<string, string>> = { tomato, blue, green, orange };

describe('og-palette', () => {
  it('derives each discipline palette from the canonical HUE (cannot drift from the app)', () => {
    for (const [d, hue] of Object.entries(HUE)) {
      const scale = SCALES[hue]!;
      const p = ogAccent(d as Discipline);
      expect(p.solid).toBe(scale[`${hue}9`]);
      expect(p.ink).toBe(scale[`${hue}11`]);
      expect(p.bloom).toBe(scale[`${hue}5`]);
    }
  });
});
