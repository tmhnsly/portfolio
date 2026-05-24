import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardDeck } from './index';
import { getAllProjects } from '@/lib/content';

describe('CardDeck', () => {
  it('shows a counter and advances on next', async () => {
    render(<CardDeck items={getAllProjects().slice(0, 4)} />);
    expect(screen.getByText(/01 \/ 04/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText(/02 \/ 04/)).toBeInTheDocument();
  });
});
