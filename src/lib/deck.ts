/**
 * Pure order maths for the hero CardDeck — an `order` array of item indices whose
 * first element is the front card. The component owns the state, timing lock and
 * drag wiring; these just compute the next order.
 */

/** Rotate one step: dir < 0 advances (front → back); dir ≥ 0 reverses (back → front). */
export function rotate(order: number[], dir: number): number[] {
  if (order.length < 2) return order; // nothing to rotate
  return dir < 0
    ? [...order.slice(1), order[0]!]
    : [order[order.length - 1]!, ...order.slice(0, -1)];
}

/** Bring `itemIndex` to the front. Returns the SAME array (no-op) when it's
    already at the front or not present. */
export function rotateTo(order: number[], itemIndex: number): number[] {
  const k = order.indexOf(itemIndex);
  return k <= 0 ? order : [...order.slice(k), ...order.slice(0, k)];
}

/** Direction of a horizontal flick: -1 (advance) / 1 (reverse) / 0 (none), past a
    distance OR velocity threshold. */
export function swipeDir(offsetX: number, velocityX: number, dist: number, vel: number): -1 | 1 | 0 {
  if (offsetX < -dist || velocityX < -vel) return -1;
  if (offsetX > dist || velocityX > vel) return 1;
  return 0;
}
