import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DisciplineScroller } from './index';

describe('DisciplineScroller', () => {
  it('renders six discipline links', () => {
    render(<DisciplineScroller />);
    expect(screen.getByRole('link', { name: /\/code/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /\/blog/ })).toBeInTheDocument();
  });
});
