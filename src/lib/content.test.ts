import { describe, it, expect } from 'vitest';
import {
  getAllProjects, getProject, getAllPosts,
  projectsInDiscipline, projectNeighbours, relatedProjects,
  postNeighbours, relatedPosts, disciplineCounts, titleMap, postCount,
} from './content';

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

describe('content queries', () => {
  it('projectsInDiscipline returns only that discipline, date-desc', () => {
    const code = projectsInDiscipline('code');
    expect(code.length).toBeGreaterThan(0);
    expect(code.every((p) => p.discipline === 'code')).toBe(true);
    for (let i = 1; i < code.length; i++) {
      expect(code[i - 1].date.localeCompare(code[i].date)).toBeGreaterThanOrEqual(0);
    }
  });

  it('projectNeighbours stay within the discipline and exclude self', () => {
    const code = projectsInDiscipline('code');
    const mid = code[1]; // has a prev (newer) and likely a next
    const { prev, next } = projectNeighbours(mid.slug);
    for (const n of [prev, next]) {
      if (n) {
        expect(n.discipline).toBe('code');
        expect(n.slug).not.toBe(mid.slug);
      }
    }
    // first item has no prev
    expect(projectNeighbours(code[0].slug).prev).toBeUndefined();
  });

  it('relatedProjects prefers same discipline, excludes self, caps at n', () => {
    const code = projectsInDiscipline('code');
    const related = relatedProjects(code[0].slug, 3);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every((p) => p.slug !== code[0].slug)).toBe(true);
    // with several code projects, all related should be code (same discipline)
    if (code.length > 3) expect(related.every((p) => p.discipline === 'code')).toBe(true);
  });

  it('relatedProjects tops up with other disciplines when a discipline is sparse', () => {
    // a discipline with a single project → related fills from elsewhere
    const counts = disciplineCounts();
    const lone = (Object.entries(counts) as [string, number][]).find(([, c]) => c === 1);
    if (lone) {
      const [d] = lone;
      const only = projectsInDiscipline(d as never)[0];
      const related = relatedProjects(only.slug, 3);
      expect(related.length).toBeGreaterThan(0);
      expect(related.some((p) => p.discipline !== d)).toBe(true);
    }
  });

  it('postNeighbours / relatedPosts exclude self', () => {
    const posts = getAllPosts();
    const { newer, older } = postNeighbours(posts[1].slug);
    expect(newer?.slug).toBe(posts[0].slug);
    expect(older?.slug).toBe(posts[2]?.slug);
    expect(relatedPosts(posts[0].slug).every((p) => p.slug !== posts[0].slug)).toBe(true);
  });

  it('disciplineCounts + titleMap + postCount agree with the corpus', () => {
    const total = Object.values(disciplineCounts()).reduce((a, b) => a + b, 0);
    expect(total).toBe(getAllProjects().length);
    expect(Object.keys(titleMap()).length).toBe(getAllProjects().length + getAllPosts().length);
    expect(postCount()).toBe(getAllPosts().length);
  });
});
