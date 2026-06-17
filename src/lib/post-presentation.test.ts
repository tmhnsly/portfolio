import { describe, it, expect } from 'vitest';
import { postPresentation } from './post-presentation';
import type { BlogPost } from '@/types';

const post = {
  slug: 'hello-world',
  title: 'Hello World',
  excerpt: '',
  date: '2026-06-04',
  category: 'Opinion',
  tags: [],
  featured: false,
  body: '',
  readingTime: 6,
  author: { name: '', role: '', bio: '' },
} as BlogPost;

describe('postPresentation', () => {
  it('resolves a post to its display facts', () => {
    expect(postPresentation(post)).toEqual({
      href: '/blog/hello-world',
      date: 'Jun 2026',
      reading: '6 min read',
      category: 'Opinion',
    });
  });
});
