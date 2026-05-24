import { describe, it, expect } from 'vitest';
import { getAllProjects, getProject, getAllPosts } from './content';

describe('content loaders', () => {
  it('loads + validates projects, derives slug from filename', () => {
    expect(getAllProjects().length).toBeGreaterThan(0);
    const boucle = getProject('boucle');
    expect(boucle?.featured).toBe(true);
    expect(boucle?.body).toContain('Boucle');
  });
  it('loads posts and computes reading time when absent', () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.readingTime > 0)).toBe(true);
  });
});
