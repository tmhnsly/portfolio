import { describe, it, expect } from 'vitest';
import { projectFrontmatterSchema, postFrontmatterSchema, disciplineSchema } from './schemas';

describe('schemas', () => {
  it('accepts valid project frontmatter and applies defaults', () => {
    const fm = projectFrontmatterSchema.parse({ title: 'Boucle', discipline: 'code', date: '2026-03-01' });
    expect(fm.tags).toEqual([]);        // default (was tech)
    expect(fm.featured).toBe(false);    // default
    expect(fm.gallery).toEqual([]);     // default
  });
  it('rejects an unknown discipline', () => {
    expect(() => disciplineSchema.parse('cooking')).toThrow();
  });
  it('requires a post excerpt', () => {
    expect(() => postFrontmatterSchema.parse({ title: 'x', date: '2026-01-01', category: 'Code' })).toThrow();
  });
  it('defaults media to an empty array', () => {
    const fm = projectFrontmatterSchema.parse({ title: 'X', discipline: 'code', date: '2026-03-01' });
    expect(fm.media).toEqual([]);
  });
  it('parses image and youtube media items and rejects unknown types', () => {
    const fm = projectFrontmatterSchema.parse({
      title: 'X', discipline: 'video', date: '2026-03-01',
      media: [
        { type: 'image', src: '/a.jpg', alt: 'a', title: 'A' },
        { type: 'youtube', id: 'abc123', poster: '/p.jpg', title: 'Clip' },
      ],
    });
    expect(fm.media).toHaveLength(2);
    expect(() => projectFrontmatterSchema.parse({
      title: 'X', discipline: 'video', date: '2026-03-01',
      media: [{ type: 'audio', src: '/a.mp3' }],
    })).toThrow();
  });
});
