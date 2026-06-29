import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import ProjectPage from './[discipline]/[slug]/page';
import { getAllProjects } from '@/lib/content';

describe('Project detail', () => {
  it('renders a project', async () => {
    const p = getAllProjects()[0]!;
    const ui = await ProjectPage({ params: Promise.resolve({ discipline: p.discipline, slug: p.slug }) });
    render(<ThemeProvider>{ui}</ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(p.title);
  });
});
