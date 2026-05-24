import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import { getAllProjects } from '@/lib/content';

describe('ProjectCard', () => {
  it('links to the project and shows its title', () => {
    const p = getAllProjects()[0];
    render(<ProjectCard project={p} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/${p.discipline}/${p.slug}`);
    expect(screen.getByText(p.title)).toBeInTheDocument();
  });
});
