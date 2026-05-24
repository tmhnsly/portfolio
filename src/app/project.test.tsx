import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import ProjectPage from './[discipline]/[slug]/page';
import { getProject } from '@/lib/content';

describe('Project detail', () => {
  it('renders a project', async () => {
    const p = getProject('chork')!;
    const ui = await ProjectPage({ params: Promise.resolve({ discipline: p.discipline, slug: p.slug }) });
    render(<ThemeProvider>{ui}</ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Chork/);
  });
});
