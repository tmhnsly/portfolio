import { describe, it, expect } from 'vitest';
import { disciplineHead, postHead, projectHead } from './page-head';
import { projectFrontmatterSchema } from './schemas';
import type { BlogPost, Project } from '@/types';

const project: Project = {
  ...projectFrontmatterSchema.parse({ title: 'Wake', discipline: 'audio', date: '2015-02-01', media: [] }),
  slug: 'wake',
  body: '',
};

const post = {
  slug: 'hello-world', title: 'Hello World', excerpt: 'A short hello.', date: '2026-06-04',
  category: 'Opinion', tags: [], featured: false, body: '', readingTime: 6,
  author: { name: '', role: '', bio: '' },
} as BlogPost;

describe('projectHead', () => {
  it('builds article metadata with publishedTime + canonical path', () => {
    const { meta } = projectHead(project);
    expect(meta.title).toBe('Wake');
    expect(meta.alternates?.canonical).toBe('/audio/wake');
    expect(meta.openGraph).toMatchObject({ type: 'article', publishedTime: '2015-02-01', url: '/audio/wake' });
  });
  it('uses the discipline description fallback when frontmatter omits desc', () => {
    expect(projectHead(project).meta.description).toBe('Audio work by Tom Hinsley.');
  });
  it('cards with the discipline label as eyebrow + a discipline accent', () => {
    const { og } = projectHead(project);
    expect(og).toMatchObject({ eyebrow: 'Audio', title: 'Wake' });
    expect(og.accent.solid).toBeTruthy();
  });
});

describe('postHead', () => {
  it('builds article metadata from the excerpt + post date', () => {
    const { meta } = postHead(post);
    expect(meta).toMatchObject({ title: 'Hello World', description: 'A short hello.' });
    expect(meta.openGraph).toMatchObject({ type: 'article', publishedTime: '2026-06-04', url: '/blog/hello-world' });
  });
  it('cards with the category as eyebrow', () => {
    expect(postHead(post).og).toMatchObject({ eyebrow: 'Opinion', title: 'Hello World' });
  });
});

describe('disciplineHead', () => {
  it('builds website metadata (no publishedTime) at the discipline route', () => {
    const { meta } = disciplineHead('code');
    expect(meta.title).toBe('Code');
    expect(meta.description).toBeTruthy();
    expect(meta.alternates?.canonical).toBe('/code');
    expect(meta.openGraph).toMatchObject({ type: 'website' });
    expect((meta.openGraph as Record<string, unknown>).publishedTime).toBeUndefined();
  });
  it('cards with the Tom Hinsley eyebrow + discipline label title', () => {
    expect(disciplineHead('code').og).toMatchObject({ eyebrow: 'Tom Hinsley', title: 'Code' });
  });
});
