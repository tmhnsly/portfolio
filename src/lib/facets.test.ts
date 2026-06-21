import { describe, it, expect } from 'vitest';
import { activeFacet, buildFacets, filterByFacet, splitFeatured } from './facets';

const items = [
  { id: 1, kind: 'a' }, { id: 2, kind: 'b' }, { id: 3, kind: 'a' }, { id: 4, kind: 'c' },
];
const kindOf = (i: { kind: string }) => i.kind;

describe('buildFacets', () => {
  it('prepends All (total) + each value with its count (first-seen order)', () => {
    expect(buildFacets(items, kindOf)).toEqual([
      { label: 'All', count: 4 },
      { label: 'a', count: 2 },
      { label: 'b', count: 1 },
      { label: 'c', count: 1 },
    ]);
  });
  it('follows a given order, dropping absent values and out-of-order ones', () => {
    expect(buildFacets(items, kindOf, ['c', 'a', 'z'])).toEqual([
      { label: 'All', count: 4 },
      { label: 'c', count: 1 },
      { label: 'a', count: 2 },
    ]); // 'z' has no items → dropped; 'b' not in order → dropped
  });
  it('empty collection → just All:0', () => {
    expect(buildFacets([], kindOf)).toEqual([{ label: 'All', count: 0 }]);
  });
});

describe('filterByFacet', () => {
  it("'All' returns everything", () => {
    expect(filterByFacet(items, kindOf, 'All')).toHaveLength(4);
  });
  it('a label returns only matching items', () => {
    expect(filterByFacet(items, kindOf, 'a').map((i) => i.id)).toEqual([1, 3]);
  });
});

describe('activeFacet', () => {
  const filters = buildFacets(items, kindOf); // All, a, b, c
  it('keeps a label that still exists', () => {
    expect(activeFacet(filters, 'a')).toBe('a');
  });
  it('falls back to All when the selected label is gone (item set changed under it)', () => {
    expect(activeFacet(filters, 'z')).toBe('All');
  });
  it("'All' is always valid", () => {
    expect(activeFacet(filters, 'All')).toBe('All');
  });
});

describe('splitFeatured', () => {
  type Card = { slug: string; featured?: boolean };
  it('picks the flagged item, caps the rest, excludes the featured', () => {
    const list: Card[] = [{ slug: 'x' }, { slug: 'y', featured: true }, { slug: 'z' }, { slug: 'w' }, { slug: 'v' }];
    const { featured, rest } = splitFeatured(list, 3);
    expect(featured?.slug).toBe('y');
    expect(rest.map((r) => r.slug)).toEqual(['x', 'z', 'w']);
  });
  it('falls back to the first item when none is flagged', () => {
    const list: Card[] = [{ slug: 'a' }, { slug: 'b' }];
    const { featured, rest } = splitFeatured(list, 3);
    expect(featured?.slug).toBe('a');
    expect(rest.map((r) => r.slug)).toEqual(['b']);
  });
  it('empty → no featured, empty rest', () => {
    expect(splitFeatured<Card>([], 3)).toEqual({ featured: undefined, rest: [] });
  });
});
