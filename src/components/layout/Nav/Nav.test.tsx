import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import { resolveZone } from '@/lib/zone';
import { Nav } from './index';

describe('Nav', () => {
  it('renders the discipline + about links and email CTA, marks active', () => {
    render(<ThemeProvider><Nav {...resolveZone('/code')} /></ThemeProvider>);
    expect(screen.getByRole('link', { name: /^code$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /hello@tomhinsley\.com/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^code$/i })).toHaveAttribute('aria-current', 'page');
  });
});
