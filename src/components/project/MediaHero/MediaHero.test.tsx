import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import { projectFrontmatterSchema } from '@/lib/schemas';
import type { Project, MediaItem } from '@/types';
import { MediaHero } from './MediaHero';

beforeAll(() => { Element.prototype.scrollIntoView = vi.fn(); });

function project(media: MediaItem[], slug = 'wake'): Project {
  return { ...projectFrontmatterSchema.parse({ title: 'Wake', discipline: 'music', date: '2015-02-01', media }), slug, body: '' };
}

describe('MediaHero', () => {
  it('opens the carousel when the poster is clicked', () => {
    render(<ThemeProvider><MediaHero project={project([{ type: 'youtube', id: 'abc', title: 'Wake' }])} /></ThemeProvider>);
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /play video|view media/i }));
    expect(screen.getByRole('dialog', { name: /media viewer/i })).toBeTruthy();
  });
  it('renders a plain gradient embed when there is no media', () => {
    render(<ThemeProvider><MediaHero project={project([])} /></ThemeProvider>);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
