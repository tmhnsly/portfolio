'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { entranceStagger, entranceItem } from '@/lib/motion';
import styles from './Entrance.module.scss';

/**
 * Shared page-entrance system (one config in lib/motion → tweak everywhere).
 *
 * <Entrance>/<EntranceItem> play the staggered reveal once, on the first load of
 * the session — subsequent navigations render the supporting items (lead, cards,
 * meta) visible immediately, so the whole hero never flashes out and back in.
 * <EntranceTitle> reveals the heading word-by-word (ported from Chork's
 * RevealText) and replays on EVERY route (keyed on the pathname). The
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
 * Wrap each WORD of the heading in a clip + slide-up span with an incrementing
 * `--i`, so words cascade up in sequence. Whitespace is preserved between words;
 * <br/> passes through; element children (the muted span, the `.` accent span)
 * recurse — their words stagger too AND keep the element's class — sharing the
 * same running index.
 */
function revealWords(node: React.ReactNode, ctx: { i: number }): React.ReactNode {
  if (node == null || typeof node === 'boolean') return node;

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
      .split(/(\s+)/)
      .map((part, k) => {
        if (part === '') return null;
        if (/^\s+$/.test(part)) return part; // keep the space between words
        const i = ctx.i++;
        return (
          <span key={`w${i}-${k}`} className={styles.wordClip}>
            <span className={styles.word} style={{ '--i': i } as React.CSSProperties}>
              {part}
            </span>
          </span>
        );
      });
  }

  if (Array.isArray(node)) {
    return node.map((n, k) => <React.Fragment key={k}>{revealWords(n, ctx)}</React.Fragment>);
  }

  if (React.isValidElement(node)) {
    if (node.type === 'br') return node;
    const props = node.props as { children?: React.ReactNode };
    return React.cloneElement(node, undefined, revealWords(props.children, ctx));
  }

  return node;
}

/**
 * Per-word title reveal. The inner wrapper is keyed on the pathname so the CSS
 * stagger re-fires on every navigation (and on first load). Reduced motion =
 * plain heading, no wrapping/animation.
 */
export function EntranceTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  if (reduce) return <h1 className={className}>{children}</h1>;
  return (
    <h1 className={`${styles.clipTitle} ${className ?? ''}`}>
      <span key={pathname} className={styles.inner}>
        {revealWords(children, { i: 0 })}
      </span>
    </h1>
  );
}
