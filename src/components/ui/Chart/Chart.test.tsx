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

  // ── New chart types / scales / ranges ──

  it('defaults type and scale to undefined (caller treats as bar/linear)', () => {
    const spec = parseChartSpec(valid);
    expect(spec?.type).toBeUndefined();
    expect(spec?.scale).toBeUndefined();
  });

  it('parses a log-scaled bar chart', () => {
    const spec = parseChartSpec(JSON.stringify({
      scale: 'log',
      data: [{ label: 'a', value: 0.5 }, { label: 'b', value: 2_500_000 }],
    }));
    expect(spec?.scale).toBe('log');
  });

  it('parses a stacked chart', () => {
    const spec = parseChartSpec(JSON.stringify({
      type: 'stacked', unit: '%',
      data: [{ label: 'video', value: 65 }, { label: 'ai', value: 3 }],
    }));
    expect(spec?.type).toBe('stacked');
  });

  it('parses range bands (low/high) on a bar', () => {
    const spec = parseChartSpec(JSON.stringify({
      data: [{ label: 'prompt', value: 10, low: 0.26, high: 50, display: '~0.3–50' }],
    }));
    expect(spec?.data[0]?.low).toBe(0.26);
    expect(spec?.data[0]?.high).toBe(50);
  });

  it('rejects an unknown chart type', () => {
    expect(parseChartSpec(JSON.stringify({ type: 'pie', data: [{ label: 'x', value: 1 }] }))).toBeNull();
  });

  it('rejects an unknown scale', () => {
    expect(parseChartSpec(JSON.stringify({ scale: 'logarithmic', data: [{ label: 'x', value: 1 }] }))).toBeNull();
  });

  it('rejects a non-numeric range bound', () => {
    expect(parseChartSpec(JSON.stringify({ data: [{ label: 'x', value: 1, low: 'tiny' }] }))).toBeNull();
  });
});
