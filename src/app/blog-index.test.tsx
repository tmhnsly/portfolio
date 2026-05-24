import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import Blog from './blog/page';
import { getAllPosts } from '@/lib/content';

describe('Blog index', () => {
  it('features the latest post and lists older ones', () => {
    render(<ThemeProvider><Blog /></ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Blog/);
    expect(screen.getByText(getAllPosts()[0].title)).toBeInTheDocument();
  });
});
