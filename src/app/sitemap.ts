import type { MetadataRoute } from 'next';
import { getAllProjects, getAllPosts } from '@/lib/content';
import { DISCIPLINES, DISCIPLINE_ORDER } from '@/lib/disciplines';
import { projectHref, postHref } from '@/lib/routes';
import { SITE_URL } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (p: string) => `${SITE_URL}${p}`;
  const top: MetadataRoute.Sitemap = [
    { url: at('/'), changeFrequency: 'monthly', priority: 1 },
    { url: at('/about'), changeFrequency: 'yearly', priority: 0.7 },
    { url: at('/blog'), changeFrequency: 'weekly', priority: 0.7 },
  ];
  const sections: MetadataRoute.Sitemap = DISCIPLINE_ORDER.filter((d) => d !== 'blog').map((d) => ({
    url: at(DISCIPLINES[d].route),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  const projects: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: at(projectHref(p.discipline, p.slug)),
    lastModified: p.date,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: at(postHref(p.slug)),
    lastModified: p.date,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));
  return [...top, ...sections, ...projects, ...posts];
}
