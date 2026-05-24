import { describe, it, expect } from 'vitest';
import { projectFrontmatterSchema, postFrontmatterSchema, disciplineSchema } from './schemas';

describe('schemas', () => {
  it('accepts valid project frontmatter and applies defaults', () => {
    const fm = projectFrontmatterSchema.parse({ title: 'Boucle', discipline: 'code', date: '2026-03-01' });
    expect(fm.tech).toEqual([]);        // default
    expect(fm.featured).toBe(false);    // default
    expect(fm.gallery).toEqual([]);     // default
  });
  it('rejects an unknown discipline', () => {
    expect(() => disciplineSchema.parse('cooking')).toThrow();
  });
  it('requires a post excerpt', () => {
    expect(() => postFrontmatterSchema.parse({ title: 'x', date: '2026-01-01', category: 'Code' })).toThrow();
  });
});
