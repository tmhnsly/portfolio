import type { MetadataRoute } from 'next';
import type { MediaItem } from '@/types';
import { getAllProjects, getAllPosts } from '@/lib/content';
import { DISCIPLINES, DISCIPLINE_ORDER } from '@/lib/disciplines';
import { projectHref, postHref } from '@/lib/routes';
import { youTubeEmbedUrl, youTubeThumbnail } from '@/lib/youtube';
import { SITE_URL } from '@/lib/site-url';

type YouTubeItem = Extract<MediaItem, { type: 'youtube' }>;

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (p: string) => `${SITE_URL}${p}`;
  const projects = getAllProjects();
  const posts = getAllPosts();

  const top: MetadataRoute.Sitemap = [
    { url: at('/'), lastModified: projects[0]?.date, changeFrequency: 'monthly', priority: 1 },
    { url: at('/about'), changeFrequency: 'yearly', priority: 0.7 },
    { url: at('/hire'), changeFrequency: 'yearly', priority: 0.8 },
    { url: at('/blog'), lastModified: posts[0]?.date, changeFrequency: 'weekly', priority: 0.7 },
  ];
  const sections: MetadataRoute.Sitemap = DISCIPLINE_ORDER.filter((d) => d !== 'blog').map((d) => ({
    url: at(DISCIPLINES[d].route),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => {
    const href = projectHref(p.discipline, p.slug);
    const description = p.desc ?? `${DISCIPLINES[p.discipline].label} work by Tom Hinsley.`;
    const yt = p.media.filter((m): m is YouTubeItem => m.type === 'youtube');
    const posters = yt.filter((m) => m.poster).map((m) => at(m.poster!));
    const videos = yt.map((m) => ({
      title: m.title ?? p.title,
      thumbnail_loc: m.poster ? at(m.poster) : youTubeThumbnail(m.id),
      description,
      player_loc: youTubeEmbedUrl(m.id, { list: m.list }),
    }));
    return {
      url: at(href),
      lastModified: p.date,
      changeFrequency: 'yearly',
      priority: 0.6,
      images: [at(`${href}/opengraph-image`), ...posters],
      ...(videos.length ? { videos } : {}),
    };
  });
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: at(postHref(p.slug)),
    lastModified: p.date,
    changeFrequency: 'yearly',
    priority: 0.6,
    images: [at(`${postHref(p.slug)}/opengraph-image`)],
  }));
  return [...top, ...sections, ...projectEntries, ...postEntries];
}
