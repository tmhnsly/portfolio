import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import About from './about/page';

describe('About', () => {
  it('renders the timeline heading', () => {
    render(<ThemeProvider><About /></ThemeProvider>);
    expect(screen.getByText(/Where I.ve been/)).toBeInTheDocument();
  });
});
