import { describe, it, expect } from 'vitest';
import { parseChartSpec } from './Chart';

describe('parseChartSpec', () => {
  const valid = JSON.stringify({
    title: 'Water per query',
    unit: 'L',
    data: [
      { label: 'Model A', value: 12, hue: 'blue', display: '~12 L' },
      { label: 'Model B', value: 3 },
    ],
  });

  it('parses a valid chart block', () => {
    const spec = parseChartSpec(valid);
    expect(spec?.data).toHaveLength(2);
    expect(spec?.title).toBe('Water per query');
  });

  it('returns null on malformed JSON', () => {
    expect(parseChartSpec('{ not json')).toBeNull();
  });

  it('returns null when data is empty (was a silent disappear)', () => {
    expect(parseChartSpec(JSON.stringify({ title: 'x', data: [] }))).toBeNull();
  });

  it('returns null when a bar has a non-numeric value', () => {
    expect(parseChartSpec(JSON.stringify({ data: [{ label: 'x', value: 'lots' }] }))).toBeNull();
  });

  it('returns null when data is missing entirely', () => {
    expect(parseChartSpec(JSON.stringify({ title: 'x' }))).toBeNull();
  });
});
