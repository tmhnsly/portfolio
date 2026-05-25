import { describe, it, expect } from 'vitest';
import { rotate, rotateTo, swipeDir } from './deck';

describe('rotate', () => {
  it('advance (dir<0) sends the front to the back', () => {
    expect(rotate([0, 1, 2, 3], -1)).toEqual([1, 2, 3, 0]);
  });
  it('reverse (dir>=0) brings the back to the front', () => {
    expect(rotate([0, 1, 2, 3], 1)).toEqual([3, 0, 1, 2]);
  });
  it('advance then reverse round-trips', () => {
    expect(rotate(rotate([0, 1, 2, 3], -1), 1)).toEqual([0, 1, 2, 3]);
  });
});

describe('rotateTo', () => {
  it('brings an item to the front', () => {
    expect(rotateTo([0, 1, 2, 3], 2)).toEqual([2, 3, 0, 1]);
  });
  it('no-ops (same reference) when already front or absent', () => {
    const o = [0, 1, 2, 3];
    expect(rotateTo(o, 0)).toBe(o);
    expect(rotateTo(o, 99)).toBe(o);
  });
});

describe('swipeDir', () => {
  it('advances on a left flick past distance OR velocity', () => {
    expect(swipeDir(-80, 0, 64, 300)).toBe(-1);
    expect(swipeDir(0, -400, 64, 300)).toBe(-1);
  });
  it('reverses on a right flick', () => {
    expect(swipeDir(80, 0, 64, 300)).toBe(1);
    expect(swipeDir(0, 400, 64, 300)).toBe(1);
  });
  it('no-ops below both thresholds', () => {
    expect(swipeDir(20, 50, 64, 300)).toBe(0);
  });
});
