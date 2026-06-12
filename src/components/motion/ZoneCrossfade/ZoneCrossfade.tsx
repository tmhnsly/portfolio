'use client';
import { createElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { DURATION, EASING } from '@/lib/motion';

/**
 * The Zone-change dissolve. Whenever `zoneKey` changes, the new layer fades in
 * over the old (opacity, GPU-composited) instead of interpolating the colour —
 * an OKLab tween between two accents passes through muddy midpoints. Drives the
 * two surfaces that re-tint per Zone: the Bloom tint and the Nav accent fill.
 * The layer is decorative (always aria-hidden); reduced-motion renders the
 * current layer with no transition.
 */
export function ZoneCrossfade({
  zoneKey,
  as = 'div',
  className,
  style,
  children,
}: {
  /** Changes per Zone — its change is what triggers the crossfade. */
  zoneKey: string;
  /** `span` for inline fills (the Nav CTA), `div` otherwise (the Bloom). */
  as?: 'div' | 'span';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  if (reduce) return createElement(as, { className, style, 'aria-hidden': true }, children);

  const props = {
    className,
    style,
    'aria-hidden': true,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: DURATION.zone, ease: EASING.smooth },
  };
  return (
    <AnimatePresence initial={false}>
      {as === 'span'
        ? <motion.span key={zoneKey} {...props}>{children}</motion.span>
        : <motion.div key={zoneKey} {...props}>{children}</motion.div>}
    </AnimatePresence>
  );
}
