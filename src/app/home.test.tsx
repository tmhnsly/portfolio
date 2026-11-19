import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import { DECK_LEAD, getProject } from '@/lib/content';
import Home from './page';

describe('Home /', () => {
  it('renders the identity headline and recent work', () => {
    render(<ThemeProvider><Home /></ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tom Hinsley/);
    expect(screen.getByRole('heading', { name: /Recent work/i })).toBeInTheDocument();
  });

  it('keeps the featured carousel projects out of Recent work', () => {
    render(<ThemeProvider><Home /></ThemeProvider>);
    const section = screen.getByRole('heading', { name: /Recent work/i }).closest('section') as HTMLElement;
    for (const slug of DECK_LEAD) {
      const title = getProject(slug)?.title ?? slug;
      expect(within(section).queryByText(title), `${title} is in the carousel, so not in Recent work`).toBeNull();
    }
  });
});
