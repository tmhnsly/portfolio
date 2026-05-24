'use client';
import { motion, useReducedMotion } from 'motion/react';
import styles from './Roll.module.scss';

const spring = { type: 'spring', stiffness: 420, damping: 38, mass: 0.8 } as const;

/**
 * Odometer-style number roll (Chork-style increment/decrement). Each digit is a
 * 0–9 column translated to the active digit, so a change (e.g. 8→1) rolls
 * through the intermediate digits with the direction implicit in the translate
 * delta — counting up rolls one way, down the other. Multi-digit safe. The
 * stacked 0–9 columns are decorative, so the real value is exposed to assistive
 * tech via a visually-hidden label. Plain text under reduced motion.
 */
export function RollNumber({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const str = String(Math.max(0, Math.trunc(value)));
  if (reduce) return <span className={styles.static}>{str}</span>;
  const digits = str.split('');
  return (
    <span className={styles.odometer}>
      <span className={styles.srOnly}>{str}</span>
      <span className={styles.odometerDigits} aria-hidden>
        {digits.map((ch, i) => (
          // key from the right so the ones column keeps its instance when the
          // digit count changes (the column rolls instead of remounting).
          <Digit key={digits.length - 1 - i} digit={Number(ch)} />
        ))}
      </span>
    </span>
  );
}

function Digit({ digit }: { digit: number }) {
  return (
    <span className={styles.digitClip}>
      <motion.span
        className={styles.digitColumn}
        initial={false}
        animate={{ y: `${-digit * 10}%` }}
        transition={spring}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className={styles.digitCell}>{n}</span>
        ))}
      </motion.span>
    </span>
  );
}
