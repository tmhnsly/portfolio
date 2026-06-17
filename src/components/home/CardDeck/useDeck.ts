'use client';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { useInView } from '@/lib/motion';
import { deckReducer, initialDeck } from '@/lib/deck';

const AUTO_MS = 8000; // dwell on each card before the deck auto-advances
const GESTURE_LOCK_MS = 380; // one advance per gesture — a fast swipe fired several

/**
 * The CardDeck's interaction seam: owns the order/direction state machine
 * (`deckReducer`), the one-advance-per-gesture lock, the off-screen-paused
 * auto-advance timer, and hover/visibility — so the component is left a thin view
 * that maps gestures and keys to `advance`/`jumpTo`. `wrapRef` + `reduce` are
 * surfaced because the component needs them for the keydown handler (DOM focus)
 * and the Motion variants.
 */
export function useDeck(n: number) {
  const [{ order, dir }, dispatch] = useReducer(deckReducer, n, initialDeck);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const { ref: wrapRef, inView } = useInView();
  const lockUntil = useRef(0);

  const advance = useCallback((d: number) => {
    const now = Date.now();
    if (now < lockUntil.current) return; // swallow extra advances within one flick
    lockUntil.current = now + GESTURE_LOCK_MS;
    dispatch({ type: 'advance', dir: d });
  }, []);

  const jumpTo = useCallback((index: number) => dispatch({ type: 'jumpTo', index }), []);

  // `order` in the deps resets the timer on every advance (auto OR manual), so
  // pressing prev/next/tick/arrow buys a full AUTO_MS on the new card. Paused when
  // reduced-motion, hovered, single-card, or scrolled off-screen.
  useEffect(() => {
    if (reduce || hovered || n <= 1 || !inView) return;
    const id = setInterval(() => advance(-1), AUTO_MS);
    return () => clearInterval(id);
  }, [reduce, hovered, n, inView, advance, order]);

  return {
    order,
    dir,
    activeIndex: order[0] ?? 0,
    reduce,
    wrapRef,
    advance,
    jumpTo,
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => setHovered(false),
  };
}
