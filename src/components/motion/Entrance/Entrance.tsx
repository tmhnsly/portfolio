'use client';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { entranceStagger, entranceItem, titleReveal } from '@/lib/motion';
import styles from './Entrance.module.scss';

/**
 * Shared page-entrance system (one config in lib/motion → tweak everywhere).
 *
 * <Entrance> is the staggered parent; it re-keys on the route so the whole
 * sequence replays on navigation. <EntranceItem> = a staggered element
 * (eyebrow / subtitle / cards). <EntranceTitle> = the heading mask-reveal.
 * All respect prefers-reduced-motion (render plain, no transform).
 */
export function Entrance({ children, className }: { children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div key={pathname} className={className} variants={entranceStagger} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}

export function EntranceItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={entranceItem}>
      {children}
    </motion.div>
  );
}

/** The heading itself is the clip (keeps its own margins); the inner slides up. */
export function EntranceTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <h1 className={className}>{children}</h1>;
  return (
    <h1 className={`${styles.clipTitle} ${className ?? ''}`}>
      <motion.span className={styles.inner} variants={titleReveal}>
        {children}
      </motion.span>
    </h1>
  );
}
