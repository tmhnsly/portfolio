import { describe, it, expect } from 'vitest';
import { youTubeEmbedUrl, youTubeThumbnail, youTubePoster } from './youtube';

describe('youtube', () => {
  it('builds a privacy-friendly embed url with minimal chrome', () => {
    const url = youTubeEmbedUrl('abc123');
    expect(url).toContain('youtube-nocookie.com/embed/abc123');
    expect(url).toContain('rel=0');
    expect(url).toContain('modestbranding=1');
    expect(url).not.toContain('autoplay');
  });
  it('adds autoplay when requested', () => {
    expect(youTubeEmbedUrl('abc123', { autoplay: true })).toContain('autoplay=1');
  });
  it('builds the hosted thumbnail url', () => {
    expect(youTubeThumbnail('abc123')).toBe('https://i.ytimg.com/vi/abc123/maxresdefault.jpg');
  });
  it('youTubePoster prefers a custom poster, else the hosted thumbnail', () => {
    expect(youTubePoster('abc123', '/covers/x.webp')).toBe('/covers/x.webp');
    expect(youTubePoster('abc123')).toBe(youTubeThumbnail('abc123'));
  });
});
