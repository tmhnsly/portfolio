import { describe, it, expect } from 'vitest';
import { coverImage } from './project-presentation';
import { projectFrontmatterSchema } from './schemas';
import type { Project, MediaItem } from '@/types';

function project(media: MediaItem[]): Project {
  return { ...projectFrontmatterSchema.parse({ title: 'Wake', discipline: 'audio', date: '2015-02-01', media }), slug: 'wake', body: '' };
}

describe('coverImage', () => {
  it('uses the first image item', () => {
    expect(coverImage(project([{ type: 'image', src: '/a.jpg', alt: 'A' }]))).toEqual({ src: '/a.jpg', alt: 'A' });
  });
  it('uses a youtube poster when present', () => {
    expect(coverImage(project([{ type: 'youtube', id: 'abc', poster: '/p.jpg', title: 'Clip' }])).src).toBe('/p.jpg');
  });
  it('falls back to the youtube thumbnail when no poster', () => {
    expect(coverImage(project([{ type: 'youtube', id: 'abc' }])).src).toBe('https://i.ytimg.com/vi/abc/maxresdefault.jpg');
  });
  it('returns no src (gradient fallback) when there is no media', () => {
    expect(coverImage(project([]))).toEqual({ src: undefined, alt: 'Wake' });
  });
});
