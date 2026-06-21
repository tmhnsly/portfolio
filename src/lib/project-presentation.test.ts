import { describe, it, expect } from 'vitest';
import { coverImage, mediaHeroView, projectPresentation } from './project-presentation';
import { projectFrontmatterSchema } from './schemas';
import type { Project, MediaItem } from '@/types';

function project(media: MediaItem[]): Project {
  return { ...projectFrontmatterSchema.parse({ title: 'Wake', discipline: 'audio', date: '2015-02-01', media }), slug: 'wake', body: '' };
}

describe('projectPresentation', () => {
  it('resolves a project to its card display facts (incl. formatted date, mirroring postPresentation)', () => {
    expect(projectPresentation(project([]))).toEqual({
      href: '/audio/wake',
      label: 'Audio',
      date: 'Feb 2015',
      gradient: 'linear-gradient(135deg, var(--blue-8), var(--blue-12))',
      color: 'var(--blue-9)',
      onColor: 'var(--white-a12)',
    });
  });
});

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

describe('mediaHeroView', () => {
  it('shows the discipline gradient when there is no media', () => {
    expect(mediaHeroView(project([]))).toEqual({ mode: 'gradient' });
  });
  it('plays a lone youtube item inline', () => {
    const v = mediaHeroView(project([{ type: 'youtube', id: 'abc', title: 'Clip' }]));
    expect(v.mode).toBe('video');
    if (v.mode === 'video') expect(v.item.id).toBe('abc');
  });
  it('treats a lone image as a poster, not a video', () => {
    expect(mediaHeroView(project([{ type: 'image', src: '/a.jpg', alt: 'A' }])))
      .toMatchObject({ mode: 'poster', isVideo: false, count: 1 });
  });
  it('flags a video cover and counts the set with several items', () => {
    expect(mediaHeroView(project([
      { type: 'youtube', id: 'abc', title: 'Clip' },
      { type: 'image', src: '/a.jpg', alt: 'A' },
    ]))).toMatchObject({ mode: 'poster', isVideo: true, count: 2 });
  });
  it('does not flag an image cover as video', () => {
    expect(mediaHeroView(project([
      { type: 'image', src: '/a.jpg', alt: 'A' },
      { type: 'youtube', id: 'abc', title: 'Clip' },
    ]))).toMatchObject({ mode: 'poster', isVideo: false, count: 2 });
  });
});
