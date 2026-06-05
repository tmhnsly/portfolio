'use client';
import type { ReactNode } from 'react';
import { useReveal } from './useReveal';
import { cx } from '@/lib/cx';

/**
 * Shared wrapper for the bespoke project thumbnails. Wires useReveal's ref and
 * latched `revealed` flag to the thumb root, adding the thumb's own `inview`
 * class once it scrolls into view (so each entrance plays once, not on mount and
 * not again on scroll-back). `aria-hidden` because the thumb is decorative — the
 * card link carries the label. Each thumb passes its own CSS-module classes.
 */
export function RevealThumb({ root, inview, children }: { root?: string; inview?: string; children: ReactNode }) {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={cx(root, revealed && inview)} aria-hidden>
      {children}
    </div>
  );
}
