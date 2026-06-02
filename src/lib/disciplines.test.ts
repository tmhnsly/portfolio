import { describe, it, expect } from 'vitest';
import { DISCIPLINES, DISCIPLINE_ORDER, isDiscipline } from './disciplines';

describe('disciplines', () => {
  it('has all four in order', () => {
    expect(DISCIPLINE_ORDER).toEqual(['code','video','audio','blog']);
  });
  it('every entry is self-consistent', () => {
    for (const slug of DISCIPLINE_ORDER) {
      const d = DISCIPLINES[slug];
      expect(d.slug).toBe(slug);
      expect(d.route).toBe(`/${slug}`);
      expect(d.swatches).toHaveLength(3);
      expect(d.color).toMatch(/^var\(--[a-z]+-9\)$/);
      expect(d.ink).toMatch(/^var\(--[a-z]+-11\)$/);
      expect(d.onAccent).toBeTruthy();
    }
  });
  it('narrows unknown strings', () => {
    expect(isDiscipline('code')).toBe(true);
    expect(isDiscipline('nope')).toBe(false);
  });
});
