import type { MetadataRoute } from 'next';
import { getAllProjects, getAllPosts } from '@/lib/content';
import { DISCIPLINES, DISCIPLINE_ORDER } from '@/lib/disciplines';
import { projectHref, postHref } from '@/lib/routes';
import { projectVideos } from '@/lib/structured-data';
import { absUrl as at } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();
  const posts = getAllPosts();

  const top: MetadataRoute.Sitemap = [
    { url: at('/'), lastModified: projects[0]?.date, changeFrequency: 'monthly', priority: 1 },
    { url: at('/about'), changeFrequency: 'yearly', priority: 0.8 },
    { url: at('/blog'), lastModified: posts[0]?.date, changeFrequency: 'weekly', priority: 0.7 },
  ];
  const sections: MetadataRoute.Sitemap = DISCIPLINE_ORDER.filter((d) => d !== 'blog').map((d) => ({
    url: at(DISCIPLINES[d].route),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => {
    const href = projectHref(p.discipline, p.slug);
    // Only the project's own hosted posters go in the image sitemap (not the
    // YouTube CDN stills). Video facts come from the shared projectVideos seam.
    const posters = p.media.flatMap((m) => (m.type === 'youtube' && m.poster ? [at(m.poster)] : []));
    const videos = projectVideos(p).map((v) => ({
      title: v.title,
      thumbnail_loc: v.thumbnailUrl,
      description: v.description,
      player_loc: v.embedUrl,
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
