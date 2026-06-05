import { describe, it, expect } from 'vitest';
import { startDrag, moveDrag, dragVisual, dismissOnDragDown, idleDrag } from './gesture';

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

describe('drag state machine', () => {
  it('does not commit an axis until travel passes the lock threshold', () => {
    const s = moveDrag(startDrag(0, 0), 4, 5); // < 8px in both axes
    expect(s.axis).toBeNull();
    expect(s.dy).toBe(0);
  });

  it('locks vertical and tracks downward travel', () => {
    const s = moveDrag(startDrag(0, 0), 2, 40);
    expect(s.axis).toBe('v');
    expect(s.dy).toBe(40);
  });

  it('locks horizontal and leaves dy at rest (native scroll-snap keeps the swipe)', () => {
    const s = moveDrag(startDrag(0, 0), 40, 2);
    expect(s.axis).toBe('h');
    expect(s.dy).toBe(0);
  });

  it('keeps its axis once locked and holds the last downward travel on an up-drag', () => {
    let s = moveDrag(startDrag(0, 0), 0, 60); // lock v, dy=60
    s = moveDrag(s, 0, 120); // dy=120
    expect(s.dy).toBe(120);
    s = moveDrag(s, 0, -10); // dragging back up holds the last applied dy
    expect(s.axis).toBe('v');
    expect(s.dy).toBe(120);
  });

  it('ignores an idle state', () => {
    expect(moveDrag(idleDrag, 100, 100)).toBe(idleDrag);
  });
});

describe('dragVisual', () => {
  it('is a no-op at rest', () => {
    expect(dragVisual(0)).toEqual({ translateY: 0, scale: 1, backdrop: 1 });
  });
  it('translates, shrinks, and fades the backdrop with downward travel', () => {
    const v = dragVisual(150); // halfway through the 300px span
    expect(v.translateY).toBe(150);
    expect(v.scale).toBeCloseTo(0.925); // 1 - 0.5 * 0.15
    expect(v.backdrop).toBeCloseTo(0.5);
  });
  it('clamps progress at full travel', () => {
    const v = dragVisual(600);
    expect(v.scale).toBeCloseTo(0.85);
    expect(v.backdrop).toBe(0);
  });
});
