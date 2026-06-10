import { describe, it, expect } from 'vitest';
import {
  projectVideoJsonLd,
  projectCreativeWorkJsonLd,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  identityGraphJsonLd,
  projectVideos,
  projectCrumbs,
} from './structured-data';
import { getProject, getPost } from './content';
import { COPY } from '@/data';

describe('projectVideoJsonLd', () => {
  it('emits a VideoObject with an absolute thumbnail for each video', () => {
    const ld = projectVideoJsonLd(getProject('wake')!);
    expect(ld).toHaveLength(1);
    const video = ld![0]!;
    expect(video['@type']).toBe('VideoObject');
    expect(video.thumbnailUrl).toBe('https://www.tomhinsley.com/images/projects/thumbnails/audio/wake.webp');
    expect(video.embedUrl).toContain('/embed/xHmZYM6n8G0');
    expect(video.uploadDate).toBe('2015-02-01T00:00:00Z');
    expect(video.name).toBe('Full film');
  });

  it('returns null for a project with no video', () => {
    expect(projectVideoJsonLd(getProject('chork')!)).toBeNull();
  });
});

describe('identityGraphJsonLd', () => {
  it('is a Person + WebSite graph with the right anchors and no email', () => {
    const graph = identityGraphJsonLd() as { '@graph': Record<string, unknown>[] };
    const person = graph['@graph'].find((n) => n['@type'] === 'Person')!;
    const website = graph['@graph'].find((n) => n['@type'] === 'WebSite')!;
    expect(person['@id']).toBe('https://www.tomhinsley.com/#person');
    expect(person.jobTitle).toContain('Frontend Developer');
    expect(person.image).toBe('https://www.tomhinsley.com/images/about/tom-hinsley.webp');
    expect(JSON.stringify(person)).not.toContain('mailto:');
    expect(person.sameAs).toEqual(expect.arrayContaining(['https://github.com/tmhnsly']));
    expect(website.publisher).toEqual({ '@id': person['@id'] });
  });
});

describe('projectVideos', () => {
  it('resolves the video facts shared by the VideoObject and the sitemap', () => {
    const vids = projectVideos(getProject('wake')!);
    expect(vids).toHaveLength(1);
    expect(vids[0]!.thumbnailUrl).toBe('https://www.tomhinsley.com/images/projects/thumbnails/audio/wake.webp');
    expect(vids[0]!.embedUrl).toContain('/embed/xHmZYM6n8G0');
  });
  it('is empty for a project with no video', () => {
    expect(projectVideos(getProject('chork')!)).toEqual([]);
  });
});

describe('projectCrumbs', () => {
  it('builds Home / Discipline / title with the right urls', () => {
    const c = projectCrumbs(getProject('wake')!);
    expect(c.map((x) => x.name)).toEqual(['Home', 'Audio', 'Wake']);
    expect(c[2]!.url).toBe('/audio/wake');
  });
});

describe('blogPostingJsonLd', () => {
  it('points the author at the shared Person and uses an absolute URL', () => {
    const post = getPost('the-water-cost-of-ai')!;
    const ld = blogPostingJsonLd(post);
    expect(ld['@type']).toBe('BlogPosting');
    expect(ld.author).toEqual({ '@id': 'https://www.tomhinsley.com/#person' });
    expect(ld.url).toBe('https://www.tomhinsley.com/blog/the-water-cost-of-ai');
    expect(ld.datePublished).toBe(post.date);
  });
});

describe('projectCreativeWorkJsonLd', () => {
  it('emits a CreativeWork keyed to the project', () => {
    const ld = projectCreativeWorkJsonLd(getProject('chork')!);
    expect(ld['@type']).toBe('CreativeWork');
    expect(ld.url).toBe('https://www.tomhinsley.com/code/chork');
    expect(ld.author).toEqual({ '@id': 'https://www.tomhinsley.com/#person' });
  });
});

describe('breadcrumbJsonLd', () => {
  it('numbers items from 1 and absolutises urls', () => {
    const ld = breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Code', url: '/code' },
    ]) as { itemListElement: Record<string, unknown>[] };
    expect(ld.itemListElement[0]).toMatchObject({ position: 1, item: 'https://www.tomhinsley.com/' });
    expect(ld.itemListElement[1]).toMatchObject({ position: 2, item: 'https://www.tomhinsley.com/code' });
  });
});

describe('faqJsonLd', () => {
  it('maps the about FAQ into Question/Answer nodes', () => {
    const ld = faqJsonLd(COPY.about.faq) as { '@type': string; mainEntity: Record<string, unknown>[] };
    expect(ld['@type']).toBe('FAQPage');
    expect(ld.mainEntity).toHaveLength(COPY.about.faq.length);
    expect(ld.mainEntity[0]).toMatchObject({ '@type': 'Question', name: COPY.about.faq[0]!.q });
  });
});
