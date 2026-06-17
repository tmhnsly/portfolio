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

/**
 * The deck's state machine, pure over the order maths above. `order[0]` is the
 * front card; `dir` is the last swap direction (drives the enter/exit animation).
 * Lifting the transitions here makes the deck's behaviour under a swipe/jump
 * sequence a table test — the useDeck hook owns the timing lock + auto-advance,
 * the component owns the spring/DOM.
 */
export type DeckState = { order: number[]; dir: number };
export type DeckAction = { type: 'advance'; dir: number } | { type: 'jumpTo'; index: number };

export const initialDeck = (n: number): DeckState => ({ order: Array.from({ length: n }, (_, i) => i), dir: -1 });

export function deckReducer(state: DeckState, action: DeckAction): DeckState {
  switch (action.type) {
    case 'advance':
      return { order: rotate(state.order, action.dir), dir: action.dir };
    case 'jumpTo': {
      const next = rotateTo(state.order, action.index);
      // rotateTo no-ops (same ref) when already front/absent — leave dir untouched then.
      return next === state.order ? state : { order: next, dir: -1 };
    }
  }
}
