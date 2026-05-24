import { describe, it, expect } from 'vitest';
import { DISCIPLINES, DISCIPLINE_ORDER, isDiscipline } from './disciplines';

describe('disciplines', () => {
  it('has all six in order', () => {
    expect(DISCIPLINE_ORDER).toEqual(['code','music','sound','photo','video','blog']);
  });
  it('every entry is self-consistent', () => {
    for (const slug of DISCIPLINE_ORDER) {
      const d = DISCIPLINES[slug];
      expect(d.slug).toBe(slug);
      expect(d.route).toBe(`/${slug}`);
      expect(d.swatches).toHaveLength(3);
      expect(d.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
  it('narrows unknown strings', () => {
    expect(isDiscipline('code')).toBe(true);
    expect(isDiscipline('nope')).toBe(false);
  });
});
