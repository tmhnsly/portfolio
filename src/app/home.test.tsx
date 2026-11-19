import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import { getAllProjects } from '@/lib/content';
import Home from './page';

describe('Home /', () => {
  it('renders the identity headline and recent work', () => {
    render(<ThemeProvider><Home /></ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tom Hinsley/);
    expect(screen.getByRole('heading', { name: /Recent work/i })).toBeInTheDocument();
  });

  it('shows the four newest projects in Recent work, carousel or not', () => {
    render(<ThemeProvider><Home /></ThemeProvider>);
    const section = screen.getByRole('heading', { name: /Recent work/i }).closest('section') as HTMLElement;
    for (const p of getAllProjects().slice(0, 4)) {
      expect(within(section).getAllByText(p.title).length, `${p.title} is one of the four newest`).toBeGreaterThan(0);
    }
  });
});
