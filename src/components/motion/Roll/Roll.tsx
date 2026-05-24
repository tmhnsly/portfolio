'use client';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import styles from './Roll.module.scss';

const spring = { type: 'spring', stiffness: 420, damping: 38, mass: 0.8 } as const;

/**
 * A value in a clip that rolls/flips to a new value on change: the old value
 * slides out and the new slides in, in the travel direction `dir` (+1 up, -1 down).
 * Transform-only (no layout/paint), so it stays smooth. Plain text under reduced motion.
 */
export function Roll({ value, dir = 1 }: { value: string | number; dir?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={styles.static}>{value}</span>;
  const d = dir >= 0 ? 1 : -1;
  return (
    <span className={styles.clip}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={String(value)}
          className={styles.item}
          initial={{ y: `${d * 100}%` }}
          animate={{ y: '0%' }}
          exit={{ y: `${d * -100}%` }}
          transition={spring}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
