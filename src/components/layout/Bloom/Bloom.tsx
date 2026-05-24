'use client';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { DURATION, EASING } from '@/lib/motion';
import styles from './Bloom.module.scss';

/**
 * Ambient background bloom. Viewport-anchored so it reads identically on every page.
 *
 * Performance: the colour is a STATIC per-instance tint (`--bloom-tint`), not the
 * live (transitioning) `--accent` — otherwise the three blur(50px) layers would
 * re-rasterise every frame for the whole transition. On a zone change we instead
 * crossfade two tinted instances via OPACITY (GPU-composited), which also avoids
 * the hard edge the old scale animation produced by clipping the blurred halo.
 */
export function Bloom({ zone = 'default', tint }: { zone?: string; tint?: string }) {
  const reduce = useReducedMotion();
  const layers = (
    <>
      <div className={styles.primary} />
      <div className={styles.cool} />
      <div className={styles.warm} />
      <div className={styles.grain} />
    </>
  );
  const style = tint ? ({ '--bloom-tint': tint } as React.CSSProperties) : undefined;

  if (reduce) {
    return (
      <div className={styles.bloom} aria-hidden style={style}>
        {layers}
      </div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={zone}
        className={styles.bloom}
        aria-hidden
        style={style}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATION.zone, ease: EASING.smooth }}
      >
        {layers}
      </motion.div>
    </AnimatePresence>
  );
}
