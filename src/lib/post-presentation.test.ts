import { describe, it, expect } from 'vitest';
import { postPresentation } from './post-presentation';
import { makePost } from './test-fixtures';

const post = makePost();

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
