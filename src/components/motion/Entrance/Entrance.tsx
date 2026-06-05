'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cx } from '@/lib/cx';
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
      style={{ animationDelay: `${(0.12 + i * 0.09).toFixed(3)}s` }}
    >
      {children}
    </div>
  );
}

/** One visual line of a title; `tone: 'muted'` greys it (the hero's second line). */
export type TitleLine = { text: string; tone?: 'muted' };

/**
 * Per-word title reveal. EntranceTitle builds the word spans itself from PLAIN
 * TEXT (a string, or `TitleLine[]` for a two-line title) — it does NOT recurse
 * through caller-supplied JSX. That matters: the title is authored in Server
 * Components, so any nested JSX would cross the RSC seam, and recursing a span
 * with mixed [string, element] children word-wrapped on the server but rendered
 * plain text on the client (a hydration mismatch). Passing data, not elements,
 * makes SSR and hydration build identical output by construction.
 *
 * `period` appends the accent full-stop glued to the final word (a nowrap group),
 * so it never orphans onto its own line. The wrapping rule, the muted tone, and
 * the glue all live here now instead of being rebuilt by hand in each hero.
 *
 * The inner wrapper is keyed on the pathname so the CSS stagger re-fires per
 * navigation. Reduced motion is handled in CSS (the `.word` rule), so the markup
 * is identical regardless and SSR/client agree.
 */
export function EntranceTitle({
  title,
  period = false,
  className,
}: {
  title: string | TitleLine[];
  period?: boolean;
  className?: string;
}) {
  const pathname = usePathname();
  const lines: TitleLine[] = typeof title === 'string' ? [{ text: title }] : title;

  let wi = 0; // running word index → the per-word stagger delay
  const word = (text: string) => {
    const i = wi++;
    return (
      <span key={`w${i}`} className={styles.wordClip}>
        <span className={styles.word} style={{ animationDelay: `${(i * 0.045).toFixed(3)}s` }}>{text}</span>
      </span>
    );
  };

  // `.clipTitle` is an empty rule (Sass drops it), so styles.clipTitle is
  // undefined — filter it out rather than emit a literal "undefined" class.
  return (
    <h1 className={cx(styles.clipTitle, className)}>
      <span key={pathname} className={styles.inner}>
        {lines.map((line, li) => {
          const isLastLine = li === lines.length - 1;
          const words = line.text.trim().split(/\s+/);
          const parts: React.ReactNode[] = [];
          words.forEach((w, k) => {
            if (k > 0) parts.push(' '); // breakable space between words
            const isFinalWord = isLastLine && k === words.length - 1;
            parts.push(
              isFinalWord && period ? (
                // glue the final word + accent period so the period can't orphan
                <span key="end" className={styles.titleEnd}>
                  {word(w)}<span className={styles.period}>.</span>
                </span>
              ) : (
                word(w)
              ),
            );
          });
          const body = line.tone === 'muted' ? <span className={styles.muted}>{parts}</span> : parts;
          return (
            <React.Fragment key={li}>
              {li > 0 && <br />}
              {body}
            </React.Fragment>
          );
        })}
      </span>
    </h1>
  );
}
