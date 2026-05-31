/** Pure builders for embedding YouTube without pulling in any SDK. */

/** Privacy-friendly embed URL with related videos off and reduced branding. */
export function youTubeEmbedUrl(id: string, { autoplay = false }: { autoplay?: boolean } = {}): string {
  const params = new URLSearchParams({ rel: '0', modestbranding: '1', playsinline: '1' });
  if (autoplay) params.set('autoplay', '1');
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/** The high-res still YouTube hosts for a video id (may 404 on old uploads — a
    custom `poster` is preferred; the discipline gradient is the final fallback). */
export function youTubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}
