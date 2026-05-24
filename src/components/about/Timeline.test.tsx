import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from './Timeline';
import { TIMELINE } from '@/data';

describe('Timeline', () => {
  it('renders the heading and every entry role', () => {
    render(<Timeline entries={TIMELINE} />);
    expect(screen.getByText(/Where I.ve been/)).toBeInTheDocument();
    // getAllByText: some roles are substrings of others (e.g. "Frontend Developer"
    // ⊂ "Freelance Frontend Developer"), so just assert each role appears at least once.
    for (const e of TIMELINE) expect(screen.getAllByText(new RegExp(e.role.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).length).toBeGreaterThan(0);
  });
});
