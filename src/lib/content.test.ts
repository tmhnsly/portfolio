import { describe, it, expect } from 'vitest';
import { getAllProjects, getProject, getAllPosts } from './content';

describe('content loaders', () => {
  it('loads + validates projects, derives slug from filename', () => {
    expect(getAllProjects().length).toBeGreaterThan(0);
    const chork = getProject('chork');
    expect(chork?.featured).toBe(true);
    expect(chork?.body).toContain('Chork');
  });
  it('loads posts and computes reading time when absent', () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.readingTime > 0)).toBe(true);
  });
});
