'use client';
import { useEffect, useState } from 'react';

/**
 * `false` on the server and the first client render, then `true` after mount.
 *
 * Gate scroll- or preference-driven styles on this so the SSR markup matches the
 * first client paint (no hydration mismatch from `useReducedMotion`, which differs
 * server vs client), and so content stays full and visible without JS — the
 * motion only layers on once we're safely past hydration.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // one-way latch, intentionally a mount-only setState (not render-derived)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return mounted;
}
