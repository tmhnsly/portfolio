import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import { YouTubeEmbed } from './YouTubeEmbed';

const renderEmbed = () => render(<ThemeProvider><YouTubeEmbed id="abc123" title="Wake" /></ThemeProvider>);

describe('YouTubeEmbed', () => {
  it('shows a play button before playing', () => {
    renderEmbed();
    expect(screen.getByRole('button', { name: /play wake/i })).toBeTruthy();
    expect(document.querySelector('iframe')).toBeNull();
  });
  it('loads the iframe on click', () => {
    renderEmbed();
    fireEvent.click(screen.getByRole('button', { name: /play wake/i }));
    const iframe = document.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe!.getAttribute('src')).toContain('embed/abc123');
    expect(iframe!.getAttribute('src')).toContain('autoplay=1');
  });
});
