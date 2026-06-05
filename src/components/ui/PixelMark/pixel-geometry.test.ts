import { describe, it, expect } from 'vitest';
import { UNION, VIEW, CELL, RAD, SWEEP_MS } from './pixel-geometry';

describe('pixel-geometry', () => {
  it('UNION covers cells with sweep delays inside [0, SWEEP]', () => {
    expect(UNION.length).toBeGreaterThan(0);
    for (const { d } of UNION) {
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThanOrEqual(SWEEP_MS);
    }
  });

  it('VIEW is a square viewBox that fits every dot (no clipping)', () => {
    expect(VIEW.side).toBeGreaterThan(0);
    const e = 1e-6;
    for (const { r, c } of UNION) {
      const cx = c * CELL + CELL / 2;
      const cy = r * CELL + CELL / 2;
      expect(cx - RAD).toBeGreaterThanOrEqual(VIEW.x - e);
      expect(cx + RAD).toBeLessThanOrEqual(VIEW.x + VIEW.side + e);
      expect(cy - RAD).toBeGreaterThanOrEqual(VIEW.y - e);
      expect(cy + RAD).toBeLessThanOrEqual(VIEW.y + VIEW.side + e);
    }
  });

  it('crops tighter than the full 256 grid (the mark fills its box)', () => {
    expect(VIEW.side).toBeLessThan(256);
  });
});
