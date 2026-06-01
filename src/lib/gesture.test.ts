import { describe, it, expect } from 'vitest';
import { dismissOnDragDown } from './gesture';

describe('dismissOnDragDown', () => {
  it('commits a dismiss past the threshold', () => {
    expect(dismissOnDragDown(140)).toBe(true);
  });
  it('springs back below the threshold', () => {
    expect(dismissOnDragDown(40)).toBe(false);
  });
  it('respects a custom threshold', () => {
    expect(dismissOnDragDown(60, 50)).toBe(true);
  });
});
