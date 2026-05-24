import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from './Timeline';
import { TIMELINE } from '@/data';

describe('Timeline', () => {
  it('renders the heading and every entry role', () => {
    render(<Timeline entries={TIMELINE} />);
    expect(screen.getByText(/Where I.ve been/)).toBeInTheDocument();
    for (const e of TIMELINE) expect(screen.getByText(new RegExp(e.role.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))).toBeInTheDocument();
  });
});
