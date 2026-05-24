import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import Home from './page';

describe('Home /', () => {
  it('renders the identity headline and selected work', () => {
    render(<ThemeProvider><Home /></ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Tom Hinsley/);
    expect(screen.getByText(/Selected work/i)).toBeInTheDocument();
  });
});
