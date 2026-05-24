'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { entranceStagger, entranceItem, titleReveal } from '@/lib/motion';
import styles from './Entrance.module.scss';

/**
 * Shared page-entrance system (one config in lib/motion → tweak everywhere).
 *
 * <Entrance> is the staggered parent. The cinematic reveal plays once, on the
 * first load of the session — on subsequent client navigations the content
 * renders visible immediately (the persistent bloom / --accent morph / eyebrow
 * roll carry the sense of motion), so navigating no longer flashes the whole
 * hero out and back in. The flag is module-scoped, so it survives client
 * navigations but resets on a full page reload.
 * <EntranceItem> = a staggered element (eyebrow / subtitle / cards).
 * <EntranceTitle> = the heading mask-reveal.
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
