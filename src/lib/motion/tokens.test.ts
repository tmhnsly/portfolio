import { describe, it, expect } from 'vitest';
import { DURATION, STAGGER, OFFSET } from './tokens';

describe('motion tokens', () => {
  it('durations are in seconds and match the spec', () => {
    expect(DURATION.medium).toBeCloseTo(0.32);
    expect(DURATION.reveal).toBeCloseTo(0.42);
  });
  it('offsets match the spec', () => {
    expect(OFFSET.deckExitY).toBe(24);
    expect(OFFSET.deckExitScale).toBeCloseTo(0.92);
    expect(OFFSET.hoverLift).toBe(-6);
    expect(STAGGER.entries).toBeCloseTo(0.06);
  });
});
