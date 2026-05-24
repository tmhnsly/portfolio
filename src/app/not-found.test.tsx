import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import NotFound from './not-found';

describe('NotFound', () => {
  it('renders 404 and the discipline shortcuts', () => {
    render(<ThemeProvider><NotFound /></ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
    expect(screen.getByRole('link', { name: /\/code/ })).toBeInTheDocument();
  });
});
