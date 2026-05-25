'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, animate, useReducedMotion } from 'motion/react';
import type { BreadcrumbData } from '@/lib/content';
import { resolveZone } from '@/lib/zone';
import { DURATION, EASING } from '@/lib/motion';
import { Nav } from '../Nav';
import { Footer } from '../Footer';
import { Bloom } from '../Bloom';
import { Breadcrumb } from '../Breadcrumb';
import styles from './Shell.module.scss';

/**
 * Persistent app shell. Lives once in the root layout so the bloom and nav
 * survive navigation and can morph the zone change in place, instead of
 * remounting per route. `usePathname()` resolves during SSR, so the accent is
 * correct on first paint (no flash).
 *
 * Zone colour transition: rather than transition --accent as a colour (sRGB →
 * muddy midpoints, and a registered <color> wouldn't theme-swap), we keep the
 * previous (`from`) and current (`to`) zone colours and animate --zone-mix 0→1;
 * --accent/--accent-ink are a color-mix(in oklch) of from→to (Shell.module.scss).
 */
export function Shell({
  children,
  breadcrumbData,
}: {
  children: React.ReactNode;
  /** Threaded straight to the Breadcrumb — the Shell doesn't read it. It's built
      in the server layout (content.ts is server-only) and the Breadcrumb is a
      client component; see docs/adr/0001-breadcrumb-data-via-shell.md. */
  breadcrumbData: BreadcrumbData;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { discipline, active, accent, accentInk, onAccent } = resolveZone(pathname);

  const mix = useMotionValue(1);
  const [to, setTo] = useState({ accent, accentInk });
  const [from, setFrom] = useState({ accent, accentInk });

  // Derive-state-during-render (no effect, no flash): a zone change makes the
  // current `to` the new `from`, sets the new `to`, and resets progress to 0 so
  // the very next paint still shows the old colour before the morph runs.
  if (to.accent !== accent || to.accentInk !== accentInk) {
    setFrom(to);
    setTo({ accent, accentInk });
    mix.set(reduce ? 1 : 0);
  }

  // Drive the morph after a zone change (skipped under reduced motion).
  useEffect(() => {
    if (reduce) {
      mix.set(1);
      return;
    }
    const controls = animate(mix, 1, { duration: DURATION.zone, ease: EASING.smooth });
    return () => controls.stop();
  }, [to, reduce, mix]);

  return (
    <motion.div
      className={styles.shell}
      style={{
        '--accent-from': from.accent,
        '--accent-to': to.accent,
        '--accent-ink-from': from.accentInk,
        '--accent-ink-to': to.accentInk,
        '--on-accent': onAccent,
        '--zone-mix': mix, // MotionValue → motion binds it; cast covers the custom props
      } as unknown as React.CSSProperties}
    >
      <Bloom zone={discipline ?? 'default'} tint={accent} />
      <Nav active={active} accent={accent} accentInk={accentInk} onAccent={onAccent} />
      <main className={styles.content}>
        {/* persistent breadcrumb — one consistent, clickable trail for every
            route, so its position never shifts and the changing segment rolls */}
        <Breadcrumb data={breadcrumbData} />
        {children}
      </main>
      <Footer />
    </motion.div>
  );
}
