import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TechChip } from './TechChip';
import { Button } from './Button';
import { FilterPills } from './FilterPills';

describe('ui primitives', () => {
  it('TechChip shows its label', () => {
    render(<TechChip label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });
  it('Button renders a button with its label', () => {
    render(<Button variant="primary">Go</Button>);
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
  it('Button renders an anchor when href is set', () => {
    render(<Button variant="secondary" href="/x">Link</Button>);
    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute('href', '/x');
  });
  it('FilterPills marks the active item via aria-pressed', () => {
    render(<FilterPills items={[{ label: 'All', count: 12 }, { label: 'Code', count: 4 }]} active={0} />);
    expect(screen.getByRole('button', { name: /All/ })).toHaveAttribute('aria-pressed', 'true');
  });
});
