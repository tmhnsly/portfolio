import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './index';

describe('Footer', () => {
  it('shows the colophon label, email and sections', () => {
    render(<Footer />);
    expect(screen.getByText(/Colophon/i)).toBeInTheDocument();
    expect(screen.getAllByText(/hello@tomhinsley\.com/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/^Sections$/)).toBeInTheDocument();
  });
});
