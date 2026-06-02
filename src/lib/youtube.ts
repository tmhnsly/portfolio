/** Pure builders for embedding YouTube without pulling in any SDK. */

/** Privacy-friendly embed URL with related videos off and reduced branding. `vq`
    is a best-effort quality hint — the modern player ultimately auto-selects by
    player size and bandwidth (it's rendered full-width 16/9, so it requests the
    highest the viewport + connection support); the param just nudges the initial
    pick up to 1080p where the client still honours it. */
export function youTubeEmbedUrl(id: string, { autoplay = false, list }: { autoplay?: boolean; list?: string } = {}): string {
  const params = new URLSearchParams({ rel: '0', modestbranding: '1', playsinline: '1', vq: 'hd1080' });
  if (autoplay) params.set('autoplay', '1');
  if (list) params.set('list', list);
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/** The high-res still YouTube hosts for a video id (may 404 on old uploads — a
    custom `poster` is preferred; the discipline gradient is the final fallback). */
export function youTubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}
