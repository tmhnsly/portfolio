import type { MediaItem, Project } from '@/types';
import { DISCIPLINES } from './disciplines';
import { SITE_URL } from './site-url';
import { youTubeEmbedUrl, youTubeThumbnail } from './youtube';

type YouTubeItem = Extract<MediaItem, { type: 'youtube' }>;

const abs = (path: string): string => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

/**
 * VideoObject JSON-LD for every YouTube item in a project. The hero embed is a
 * click-to-play facade, so the player never enters the crawled DOM and Google
 * can't infer a thumbnail — this hands it one explicitly (the project's `poster`,
 * else the hosted YouTube still), fixing the Search Console "No thumbnail URL
 * provided" video-indexing error. Returns null when a project has no video, so
 * the page can skip the script entirely.
 */
export function projectVideoJsonLd(project: Project): Record<string, unknown>[] | null {
  const videos = project.media.filter((m): m is YouTubeItem => m.type === 'youtube');
  if (videos.length === 0) return null;
  const description = project.desc ?? `${DISCIPLINES[project.discipline].label} work by Tom Hinsley.`;
  return videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title ?? project.title,
    description,
    thumbnailUrl: abs(v.poster ?? youTubeThumbnail(v.id)),
    uploadDate: project.date,
    embedUrl: youTubeEmbedUrl(v.id, { list: v.list }),
  }));
}
