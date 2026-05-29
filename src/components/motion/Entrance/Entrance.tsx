'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'motion/react';
import styles from './Entrance.module.scss';

/**
 * Shared page-entrance system. CSS-driven so it runs on first paint with NO
 * JS-hydration wait — the previous motion-driven version SSR'd items in their
 * `hidden` state, leaving them invisible until motion hydrated (the visible
 * "hang then snap" on a cold load, most obvious on the home hero's deck).
 *
 * <Entrance>/<EntranceItem>: stagger-fade once on the first session load. The
 * outer Entrance adds an `.animate` class on first paint (the module flag is
 * fresh per server request — so SSR always emits it — and is set client-side
 * after mount so subsequent client navigations skip the entrance). CSS handles
 * the keyframe + delay; pass an `i` prop on each EntranceItem for stagger order.
 *
 * <EntranceTitle>: word-by-word heading reveal (CSS keyframes, ported from
 * Chork). Replays on every route via a pathname key.
 *
 * Reduced motion is handled by @media in the SCSS — no JS branching needed for
 * the fade items; EntranceTitle still short-circuits in JS to skip the per-word
 * wrapping entirely.
 */
let hasEntered = false;

export function Entrance({ children, className }: { children: React.ReactNode; className?: string }) {
  // Decide once at mount: SSR (per-request) always sees hasEntered=false → adds
  // `.animate`, the CSS runs at first paint. The effect flips the flag client-side
  // so subsequent client navigations render the items plainly (no replay).
  const [animate] = useState(() => !hasEntered);
  useEffect(() => { hasEntered = true; }, []);
  return (
    <div className={`${className ?? ''} ${animate ? styles.animate : ''}`.trim()}>
      {children}
    </div>
  );
}

export function EntranceItem({ children, className, i = 0 }: { children: React.ReactNode; className?: string; i?: number }) {
  return (
    <div
      className={`${className ?? ''} ${styles.entranceItem}`.trim()}
      style={{ '--ei-i': i } as React.CSSProperties}
    >
      {children}
    </div>
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
