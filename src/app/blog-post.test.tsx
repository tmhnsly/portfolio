import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import Post from './blog/[slug]/page';
import { getAllPosts } from '@/lib/content';

describe('Blog post', () => {
  it('renders the post title and author', async () => {
    const p = getAllPosts().find((x) => x.body.trim().length > 0)!;
    const ui = await Post({ params: Promise.resolve({ slug: p.slug }) });
    render(<ThemeProvider>{ui}</ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText(/Tom Hinsley/).length).toBeGreaterThan(0);
  });
});
