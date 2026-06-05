import { describe, it, expect } from 'vitest';
import { projectFrontmatterSchema, postFrontmatterSchema, disciplineSchema, parseFrontmatter } from './schemas';

describe('schemas', () => {
  it('accepts valid project frontmatter and applies defaults', () => {
    const fm = projectFrontmatterSchema.parse({ title: 'Boucle', discipline: 'code', date: '2026-03-01' });
    expect(fm.tags).toEqual([]);        // default
    expect(fm.featured).toBe(false);    // default
    expect(fm.media).toEqual([]);       // default
  });
  it('rejects an unknown discipline', () => {
    expect(() => disciplineSchema.parse('cooking')).toThrow();
  });
  it('requires a post excerpt', () => {
    expect(() => postFrontmatterSchema.parse({ title: 'x', date: '2026-01-01', category: 'Code' })).toThrow();
  });
  it('parseFrontmatter names the file and the offending field on failure', () => {
    expect(() =>
      parseFrontmatter(projectFrontmatterSchema, { title: 'X', discipline: 'cooking', date: '2026-01-01' }, 'content/projects/bad.md'),
    ).toThrow(/content\/projects\/bad\.md[\s\S]*discipline/);
  });
  it('parseFrontmatter returns the parsed value on success', () => {
    const fm = parseFrontmatter(projectFrontmatterSchema, { title: 'OK', discipline: 'code', date: '2026-03-01' }, 'content/projects/ok.md');
    expect(fm.title).toBe('OK');
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
