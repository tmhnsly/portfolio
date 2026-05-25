'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether the returned `ref`'s element is currently intersecting the
 * viewport (IntersectionObserver, threshold 0). Use it to pause animation or
 * timers while off-screen — the CardDeck auto-advance and the Marquee scroll
 * both gate on it.
 *
 * Starts `false`; flips to `true` once the element intersects and back when it
 * leaves. Observes once on mount and disconnects on unmount.
 */
export function useInView<T extends Element = HTMLDivElement>(): {
  ref: React.RefObject<T | null>;
  inView: boolean;
} {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}
