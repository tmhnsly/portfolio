import { describe, it, expect } from 'vitest';
import { projectVideoJsonLd } from './structured-data';
import { getProject } from './content';

describe('projectVideoJsonLd', () => {
  it('emits a VideoObject with an absolute thumbnail for each video', () => {
    const ld = projectVideoJsonLd(getProject('wake')!);
    expect(ld).toHaveLength(1);
    const video = ld![0]!;
    expect(video['@type']).toBe('VideoObject');
    expect(video.thumbnailUrl).toBe('https://tomhinsley.com/images/projects/thumbnails/audio/wake.webp');
    expect(video.embedUrl).toContain('/embed/xHmZYM6n8G0');
    expect(video.uploadDate).toBe('2015-02-01');
    expect(video.name).toBe('Full film');
  });

  it('returns null for a project with no video', () => {
    expect(projectVideoJsonLd(getProject('chork')!)).toBeNull();
  });
});
