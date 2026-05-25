import { describe, it, expect } from 'vitest';
import { buildCrumbs, humanize } from './breadcrumb';

const data = {
  projectCounts: { code: 8, photo: 1 },
  titleMap: { '/code/chork': 'Chork' },
  postCount: 9,
};

describe('buildCrumbs', () => {
  it('home → just Home, no link', () => {
    const c = buildCrumbs('/', data);
    expect(c).toHaveLength(1);
    expect(c[0]).toMatchObject({ slot: 'home', label: 'Home' });
    expect(c[0].href).toBeUndefined();
  });

  it('off-root → Home links to /', () => {
    expect(buildCrumbs('/about', data)[0].href).toBe('/');
  });

  it('about → Home / About (current, no link/count)', () => {
    const c = buildCrumbs('/about', data);
    expect(c.map((x) => x.label)).toEqual(['Home', 'About']);
    expect(c[1]).toMatchObject({ slot: 'section' });
    expect(c[1].href).toBeUndefined();
    expect(c[1].count).toBeUndefined();
  });

  it('discipline landing → section with count + pluralised unit, no href', () => {
    const c = buildCrumbs('/code', data);
    expect(c[1]).toMatchObject({ slot: 'section', label: 'Code', count: 8, unit: 'projects' });
    expect(c[1].href).toBeUndefined();
  });

  it('singular unit when count is 1', () => {
    expect(buildCrumbs('/photo', data)[1].unit).toBe('project');
  });

  it('blog landing uses postCount + post(s)', () => {
    expect(buildCrumbs('/blog', data)[1]).toMatchObject({ count: 9, unit: 'posts' });
  });

  it('project leaf → Home / Code(link) / title from titleMap', () => {
    const c = buildCrumbs('/code/chork', data);
    expect(c.map((x) => x.slot)).toEqual(['home', 'section', 'leaf']);
    expect(c[1]).toMatchObject({ label: 'Code', href: '/code' });
    expect(c[2]).toMatchObject({ slot: 'leaf', label: 'Chork' });
  });

  it('leaf falls back to a humanized slug when not in titleMap', () => {
    expect(buildCrumbs('/code/some-thing', data)[2].label).toBe('Some Thing');
  });

  it('unknown top segment → humanized section', () => {
    expect(buildCrumbs('/playground', data)[1]).toMatchObject({ slot: 'section', label: 'Playground' });
  });
});

describe('humanize', () => {
  it('title-cases hyphenated slugs', () => {
    expect(humanize('agile-energy-dashboard')).toBe('Agile Energy Dashboard');
    expect(humanize('chork')).toBe('Chork');
  });
});
