import { describe, it, expect } from 'vitest';
import {
  getAllProjects, getProject, getAllPosts,
  projectsInDiscipline, projectNeighbours, relatedProjects,
  postNeighbours, relatedPosts, disciplineCounts, titleMap, postCount, featuredPost,
  featuredProjects, DECK_LEAD,
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
      expect(code[i - 1]!.date.localeCompare(code[i]!.date)).toBeGreaterThanOrEqual(0);
    }
  });

  it('projectNeighbours stay within the discipline and exclude self', () => {
    const code = projectsInDiscipline('code');
    const mid = code[1]!; // has a prev (newer) and likely a next
    const { prev, next } = projectNeighbours(mid.slug);
    for (const n of [prev, next]) {
      if (n) {
        expect(n.discipline).toBe('code');
        expect(n.slug).not.toBe(mid.slug);
      }
    }
    // the ends wrap around: first item's prev is the last, last item's next is the first
    if (code.length > 1) {
      expect(projectNeighbours(code[0]!.slug).prev?.slug).toBe(code.at(-1)!.slug);
      expect(projectNeighbours(code.at(-1)!.slug).next?.slug).toBe(code[0]!.slug);
    }
  });

  it('relatedProjects prefers same discipline, excludes self, caps at n', () => {
    const code = projectsInDiscipline('code');
    const related = relatedProjects(code[0]!.slug, 3);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every((p) => p.slug !== code[0]!.slug)).toBe(true);
    // with several code projects, all related should be code (same discipline)
    if (code.length > 3) expect(related.every((p) => p.discipline === 'code')).toBe(true);
  });

  it('relatedProjects tops up with other disciplines when a discipline is sparse', () => {
    // a discipline with a single project → related fills from elsewhere
    const counts = disciplineCounts();
    const lone = (Object.entries(counts) as [string, number][]).find(([, c]) => c === 1);
    if (lone) {
      const [d] = lone;
      const only = projectsInDiscipline(d as never)[0]!;
      const related = relatedProjects(only.slug, 3);
      expect(related.length).toBeGreaterThan(0);
      expect(related.some((p) => p.discipline !== d)).toBe(true);
    }
  });

  it('postNeighbours / relatedPosts exclude self', () => {
    const posts = getAllPosts();
    // relatedPosts never includes the post itself, whatever the corpus size
    expect(relatedPosts(posts[0]!.slug).every((p) => p.slug !== posts[0]!.slug)).toBe(true);
    // posts are newest-first, so the first has no newer neighbour
    expect(postNeighbours(posts[0]!.slug).newer).toBeUndefined();
    // middle-post neighbour ordering only applies once there are 3+ posts
    if (posts.length >= 3) {
      const { newer, older } = postNeighbours(posts[1]!.slug);
      expect(newer?.slug).toBe(posts[0]!.slug);
      expect(older?.slug).toBe(posts[2]!.slug);
    }
  });

  it('featuredPost leads with the flagged post (else most recent) and the rest is everything else', () => {
    const posts = getAllPosts();
    const { featured, rest } = featuredPost();
    const expected = posts.find((p) => p.featured) ?? posts[0]!;
    expect(featured?.slug).toBe(expected.slug);
    expect(rest.some((p) => p.slug === featured?.slug)).toBe(false);
    expect(rest.length).toBe(posts.length - 1); // uncapped — every other post
  });

  it('every DECK_LEAD slug resolves to a real project (no silent drop)', () => {
    const slugs = new Set(getAllProjects().map((p) => p.slug));
    for (const slug of DECK_LEAD) expect(slugs.has(slug), `DECK_LEAD slug "${slug}" has no project`).toBe(true);
  });

  it('featuredProjects leads with the DECK_LEAD order, then fills, capped at n', () => {
    const deck = featuredProjects(4);
    expect(deck.length).toBeLessThanOrEqual(4);
    // the curated lead opens the deck, in order
    expect(deck.slice(0, DECK_LEAD.length).map((p) => p.slug)).toEqual(DECK_LEAD);
    // no duplicates
    expect(new Set(deck.map((p) => p.slug)).size).toBe(deck.length);
  });

  it('disciplineCounts + titleMap + postCount agree with the corpus', () => {
    const total = Object.values(disciplineCounts()).reduce((a, b) => a + b, 0);
    expect(total).toBe(getAllProjects().length);
    expect(Object.keys(titleMap()).length).toBe(getAllProjects().length + getAllPosts().length);
    expect(postCount()).toBe(getAllPosts().length);
  });
});
