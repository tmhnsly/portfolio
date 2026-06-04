'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'motion/react';
import styles from './Entrance.module.scss';

/**
 * Page-entrance reveals (CSS keyframes, GPU-composited fade + slide).
 *
 * The reveal is intentionally NOT played on the first cold load. On a slow Safari
 * load the page's first-load JS blocks the main thread long enough that the CSS
 * reveal gets DEFERRED — leaving the content hidden for a few seconds, then
 * snapping in ("Tom Hinsley, then a hold, then the rest"). Nothing about the
 * animation itself fixes that; it's a hydration-cost problem. So the first paint
 * just shows the content (no hide), and the staggered reveal plays on every
 * client navigation after that, where the page is already warm and it runs
 * smoothly. Reduced motion = no reveal anywhere (handled in the SCSS).
 *
 * <Entrance> adds `.playing` once the session has navigated; <EntranceItem> /
 * <EntranceTitle> reveals are gated on that class so the first load is exempt.
 */
let hasEntered = false;

export function Entrance({ children, className }: { children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    // First mount of the session = the cold load → leave it visible, no reveal.
    // Any navigation after that → play the reveal (the page is warm here).
    if (hasEntered) setReveal(true);
    hasEntered = true;
  }, [pathname]);
  return (
    <div className={`${className ?? ''} ${reveal ? styles.playing : ''}`.trim()}>
      {children}
    </div>
  );
}

export function EntranceItem({ children, className, i = 0 }: { children: React.ReactNode; className?: string; i?: number }) {
  return (
    <div
      className={`${className ?? ''} ${styles.entranceItem}`.trim()}
      style={{ animationDelay: `${(0.12 + i * 0.09).toFixed(3)}s` }}
    >
      {children}
    </div>
  );
}

/**
 * Wrap each WORD of the heading in a slide-up span with an incrementing inline
 * animation-delay, so words cascade up in sequence. Whitespace is preserved
 * between words; <br/> passes through; element children (the muted span, the `.`
 * accent span) recurse — their words stagger too AND keep the element's class,
 * sharing the running index. The reveal is gated on `.playing` (see above).
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
            <span className={styles.word} style={{ animationDelay: `${(i * 0.045).toFixed(3)}s` }}>
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
 * stagger re-fires on every navigation. Reduced motion = plain heading.
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
