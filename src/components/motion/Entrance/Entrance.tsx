'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { entranceStagger, entranceItem, titleReveal } from '@/lib/motion';
import styles from './Entrance.module.scss';

/**
 * Shared page-entrance system (one config in lib/motion → tweak everywhere).
 *
 * <Entrance>/<EntranceItem> play the staggered reveal once, on the first load of
 * the session — subsequent navigations render the supporting items (lead, cards,
 * meta) visible immediately, so the whole hero never flashes out and back in.
 * <EntranceTitle>, however, replays its mask-reveal on EVERY route (keyed on the
 * pathname): the heading slides up from its clip on each navigation, which gives
 * routes a considered text entrance without blanking the rest of the hero. The
 * module-scoped flag resets on a full page reload.
 * All respect prefers-reduced-motion (render plain, no transform).
 */
let hasEntered = false;

export function Entrance({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  // Decide once, at mount: animate only if the entrance hasn't played yet this
  // session. Reading the module flag here (not in render-after-mount) keeps the
  // server + first-client render in agreement (both see `false`).
  const [animate] = useState(() => !hasEntered);
  useEffect(() => {
    hasEntered = true;
  }, []);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={entranceStagger}
      initial={animate ? 'hidden' : 'visible'}
      animate="visible"
    >
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

/**
 * The heading itself is the clip (keeps its own margins); the inner slides up.
 * Keyed on the pathname + its own initial/animate (decoupled from the parent
 * stagger) so the mask-reveal replays on every navigation, not just first load.
 */
export function EntranceTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  if (reduce) return <h1 className={className}>{children}</h1>;
  return (
    <h1 className={`${styles.clipTitle} ${className ?? ''}`}>
      <motion.span
        key={pathname}
        className={styles.inner}
        variants={titleReveal}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.span>
    </h1>
  );
}
