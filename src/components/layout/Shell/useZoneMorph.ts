'use client';
import { useEffect, useState } from 'react';
import { useMotionValue, animate, type MotionValue } from 'motion/react';
import { DURATION, EASING } from '@/lib/motion';

export interface ZoneAccent {
  accent: string;
  accentInk: string;
}

/**
 * Drives the Zone colour morph for the Shell. Rather than transition `--accent`
 * as a colour (sRGB → muddy midpoints, and a registered <color> wouldn't
 * theme-swap), it keeps the previous (`from`) and current (`to`) accents and a
 * `mix` 0→1 MotionValue; Shell.module.scss does the
 * `color-mix(in oklab, from, to, mix)`.
 *
 * On a Zone change it makes the old `to` the new `from`, sets the new `to`, and
 * resets `mix` to 0 — all *during render*, no effect, no flash: the very next
 * paint still shows the old colour before the morph runs. An effect then animates
 * `mix` to 1. Reduced motion jumps straight to the target (`mix` stays 1).
 *
 * Compares by value, so the caller may pass a fresh `{ accent, accentInk }` each
 * render (the Shell does) without triggering a spurious morph.
 */
export function useZoneMorph(
  current: ZoneAccent,
  // matches useReducedMotion()'s return — null (undetermined, during SSR) is treated as "animate"
  reduce: boolean | null,
): { from: ZoneAccent; to: ZoneAccent; mix: MotionValue<number> } {
  const mix = useMotionValue(1);
  const [to, setTo] = useState<ZoneAccent>(current);
  const [from, setFrom] = useState<ZoneAccent>(current);

  if (to.accent !== current.accent || to.accentInk !== current.accentInk) {
    setFrom(to);
    setTo(current);
    mix.set(reduce ? 1 : 0);
  }

  useEffect(() => {
    if (reduce) {
      mix.set(1);
      return;
    }
    const controls = animate(mix, 1, { duration: DURATION.zone, ease: EASING.smooth });
    return () => controls.stop();
  }, [to, reduce, mix]);

  return { from, to, mix };
}
