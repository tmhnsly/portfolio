'use client';
import { useEffect, useState } from 'react';
import { useInView } from '@/lib/motion';

/**
 * Latched in-view for the bespoke thumbnails: returns a ref + `revealed`, which
 * flips true the first time the element enters the viewport and then stays true.
 * The thumbnails gate their entrance animations on it (an `.inview` class toggling
 * a `--play` custom property) so they play once on reveal — not on mount, and not
 * again on every scroll-back.
 */
export function useReveal<T extends Element = HTMLDivElement>() {
  const { ref, inView } = useInView<T>();
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    // latch on the intersection observer's signal — a deliberate one-way setState
    // from an external subscription, not a render-derived value
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (inView) setRevealed(true);
  }, [inView]);
  return { ref, revealed };
}
