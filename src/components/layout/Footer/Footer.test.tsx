import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './index';

describe('Footer', () => {
  it('shows the fact label, email and sections', () => {
    render(<Footer />);
    expect(screen.getByText(/Useless fact/i)).toBeInTheDocument();
    expect(screen.getAllByText(/hello@tomhinsley\.com/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/^Sections$/)).toBeInTheDocument();
  });
});
