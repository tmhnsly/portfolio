import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import type { MediaItem } from '@/types';
import { MediaCarousel } from './MediaCarousel';

beforeAll(() => {
  // jsdom implements neither — the component calls them for slide sync.
  Element.prototype.scrollIntoView = vi.fn();
});

const items: MediaItem[] = [
  { type: 'image', src: '/a.jpg', alt: 'A', title: 'First' },
  { type: 'youtube', id: 'abc', title: 'Second' },
  { type: 'image', src: '/c.jpg', alt: 'C', title: 'Third' },
];

function renderCarousel(onClose = vi.fn()) {
  render(<ThemeProvider><MediaCarousel items={items} startIndex={0} gradient="linear-gradient(black,black)" onClose={onClose} /></ThemeProvider>);
  return onClose;
}

describe('MediaCarousel', () => {
  it('renders a dialog with a slide per item and a counter', () => {
    renderCarousel();
    expect(screen.getByRole('dialog', { name: /media viewer/i })).toBeTruthy();
    expect(screen.getByText('01 / 03')).toBeTruthy();
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Third')).toBeTruthy();
  });
  it('advances the counter on the next button', () => {
    renderCarousel();
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('02 / 03')).toBeTruthy();
  });
  it('wraps backward on ArrowLeft', () => {
    renderCarousel();
    fireEvent.keyDown(document, { key: 'ArrowLeft' }); // wrap backwards from 0 -> last
    expect(screen.getByText('03 / 03')).toBeTruthy();
  });
  it('advances on ArrowRight', () => {
    renderCarousel();
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByText('02 / 03')).toBeTruthy();
  });
  it('closes on Escape', () => {
    const onClose = renderCarousel();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
