/**
 * Swipe-down-to-dismiss gesture for the Media carousel — a pure state machine so
 * the carousel's touch handlers stay thin (feed coordinates in, apply the returned
 * visual, ask whether a release dismisses) and the lock/progress maths is testable
 * without a DOM. The caller owns the actual transform writes.
 */

const LOCK_PX = 8; // travel before the gesture commits to an axis
const PROGRESS_SPAN = 300; // px of downward drag that maps to full (1.0) progress
const DISMISS_PAST = 100; // release past this much downward travel dismisses
const MAX_SCALE_DROP = 0.15; // how far the sheet shrinks at full progress

export type Axis = 'h' | 'v' | null;

/** In-flight drag: the start point, the committed axis, and the downward travel
    currently applied to the sheet (`dy`, 0 until it locks vertical and moves down). */
export interface DragState {
  x: number;
  y: number;
  axis: Axis;
  active: boolean;
  dy: number;
}

export const idleDrag: DragState = { x: 0, y: 0, axis: null, active: false, dy: 0 };

export function startDrag(x: number, y: number): DragState {
  return { x, y, axis: null, active: true, dy: 0 };
}

/**
 * Advance the gesture with the latest touch point. Commits to an axis once travel
 * passes LOCK_PX (vertical wins ties via the larger delta). Only downward travel
 * under a vertical lock moves the sheet; anything else holds the last applied `dy`
 * (the original simply didn't repaint), so a horizontal swipe stays with the native
 * scroll-snap and an up-drag past the start doesn't fight it.
 */
export function moveDrag(s: DragState, x: number, y: number): DragState {
  if (!s.active) return s;
  const dx = x - s.x;
  const rawDy = y - s.y;
  let axis = s.axis;
  if (!axis) {
    if (Math.abs(rawDy) > LOCK_PX || Math.abs(dx) > LOCK_PX) axis = Math.abs(rawDy) > Math.abs(dx) ? 'v' : 'h';
    else return s;
  }
  return { ...s, axis, dy: axis === 'v' && rawDy > 0 ? rawDy : s.dy };
}

/** The sheet transform + backdrop opacity for a given downward travel.
    `backdrop` runs 1 (solid) → 0 (gone) as the drag approaches PROGRESS_SPAN. */
export function dragVisual(dy: number): { translateY: number; scale: number; backdrop: number } {
  const progress = Math.min(dy / PROGRESS_SPAN, 1);
  return { translateY: dy, scale: 1 - progress * MAX_SCALE_DROP, backdrop: 1 - progress };
}

/** Whether releasing at `dy` downward travel should dismiss (vs. spring back). */
export function dismissOnDragDown(dy: number, past = DISMISS_PAST): boolean {
  return dy > past;
}
