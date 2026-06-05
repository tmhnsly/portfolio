'use client';
import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cx } from '@/lib/cx';
import styles from './Rolling.module.scss';

type Dir = 'up' | 'down';

/**
 * A value that slides to its new value when it changes (ported from the Chork
 * leaderboard scroller): the new value enters from below (increment / text) or
 * from above (decrement) inside a top/bottom-clipped box. Renders ONLY the
 * current value — no hidden digits. Uses the React-recommended derive-state-
 * during-render pattern (no effect, no double paint) to bump the key + pick the
 * direction. Plain text under reduced motion.
 */
export function Rolling({ value, className }: { value: string | number; className?: string }) {
  const reduce = useReducedMotion();
  const [prev, setPrev] = useState(value);
  const [animKey, setAnimKey] = useState(0);
  const [dir, setDir] = useState<Dir | null>(null);

  if (value !== prev) {
    setDir(typeof value === 'number' && typeof prev === 'number' ? (value > prev ? 'up' : 'down') : 'up');
    setPrev(value);
    setAnimKey((k) => k + 1);
  }

  if (reduce) return <span className={cx(styles.static, className)}>{value}</span>;

  const itemCls = cx(styles.item, dir === 'up' && styles.up, dir === 'down' && styles.down, className);
  return (
    <span className={styles.clip}>
      <span key={animKey} className={itemCls} onAnimationEnd={() => setDir(null)}>
        {value}
      </span>
    </span>
  );
}
