'use client';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASING } from '@/lib/motion';
import styles from './Bloom.module.scss';

/**
 * Ambient background bloom. Viewport-anchored (so it reads identically on every
 * page regardless of content height) and re-keyed on `zone` so it does a subtle
 * scale+fade "breath" on a zone change while its colour (var(--accent)) crossfades
 * via the Shell's @property transition.
 */
export function Bloom({ zone = 'default' }: { zone?: string }) {
  const reduce = useReducedMotion();
  const layers = (
    <>
      <div className={styles.primary} />
      <div className={styles.cool} />
      <div className={styles.warm} />
      <div className={styles.grain} />
    </>
  );

  if (reduce) {
    return (
      <div className={styles.bloom} aria-hidden>
        {layers}
      </div>
    );
  }

  return (
    <motion.div
      key={zone}
      className={styles.bloom}
      aria-hidden
      initial={{ scale: 0.96, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: DURATION.bloom, ease: EASING.standard }}
    >
      {layers}
    </motion.div>
  );
}
