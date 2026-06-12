import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { PrevNext } from './PrevNext';

describe('PrevNext', () => {
  it('links each present neighbour, captioned and titled', () => {
    render(
      <PrevNext
        ariaLabel="Post navigation"
        prevLabel="Older post"
        nextLabel="Newer post"
        prev={{ href: '/blog/a', title: 'Alpha' }}
        next={{ href: '/blog/b', title: 'Beta' }}
      />,
    );
    expect(screen.getByRole('link', { name: /alpha/i })).toHaveAttribute('href', '/blog/a');
    expect(screen.getByRole('link', { name: /beta/i })).toHaveAttribute('href', '/blog/b');
    expect(screen.getByText('Older post')).toBeInTheDocument();
    expect(screen.getByText('Newer post')).toBeInTheDocument();
  });

  it('renders a muted, non-link "—" placeholder for an absent neighbour', () => {
    render(
      <PrevNext
        ariaLabel="Project navigation"
        prevLabel="Previous in /code"
        nextLabel="Next in /code"
        prev={{ href: '/code/a', title: 'Alpha' }}
      />,
    );
    // only the prev side is a link; the next side is the disabled placeholder
    expect(screen.getAllByRole('link')).toHaveLength(1);
    const nav = screen.getByRole('navigation', { name: 'Project navigation' });
    expect(within(nav).getByText('—')).toBeInTheDocument();
  });
});
