import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/lib/theme';
import SectionPage from './[discipline]/page';

describe('Section hub', () => {
  it('renders the code section title', async () => {
    const ui = await SectionPage({ params: Promise.resolve({ discipline: 'code' }) });
    render(<ThemeProvider>{ui}</ThemeProvider>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Code/);
  });
});
