import { describe, it, expect } from 'vitest';
import { formatMonthYear, readingLabel } from './format';

describe('format', () => {
  it('formats ISO date as "Mon YYYY"', () => {
    expect(formatMonthYear('2026-03-01')).toBe('Mar 2026');
  });
  it('renders a reading-time label', () => {
    expect(readingLabel(6)).toBe('6 min read');
  });
});
