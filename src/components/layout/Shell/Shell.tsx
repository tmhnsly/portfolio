'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion, useMotionTemplate, useTransform } from 'motion/react';
import type { BreadcrumbData } from '@/lib/content';
import { resolveZone } from '@/lib/zone';
import { Nav } from '../Nav';
import { Footer } from '../Footer';
import { Bloom } from '../Bloom';
import { Breadcrumb } from '../Breadcrumb';
import { useZoneMorph } from './useZoneMorph';
import styles from './Shell.module.scss';

/**
 * Persistent app shell. Lives once in the root layout so the bloom and nav
 * survive navigation and can morph the zone change in place, instead of
 * remounting per route. `usePathname()` resolves during SSR, so the accent is
 * correct on first paint (no flash).
 *
 * Its job is orchestration: resolve the Zone, then thread the resolved Accent
 * tokens to Bloom/Nav/Breadcrumb. The Zone colour morph (the from/to/mix dance
 * consumed by Shell.module.scss) lives in `useZoneMorph`.
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
  // the subtle, no-flash Zone colour morph lives in its own tested hook
  const { from, to, mix } = useZoneMorph({ accent, accentInk }, reduce);
  // Build --accent / --accent-ink as single motion-driven values: the OKLab
  // from→to interpolation, updated atomically each frame. The previous version
  // combined the React-committed from/to strings with a motion-driven --zone-mix
  // in CSS, which raced — the new colour could paint for a frame before motion
  // reset the mix (a visible jump). One motion template per var has no such split.
  // (Unregistered string → still re-resolves the Radix scale on a theme toggle.)
  const mixPct = useTransform(mix, (m) => `${m * 100}%`);
  const accentVar = useMotionTemplate`color-mix(in oklab, ${from.accent}, ${to.accent} ${mixPct})`;
  const accentInkVar = useMotionTemplate`color-mix(in oklab, ${from.accentInk}, ${to.accentInk} ${mixPct})`;

  // Reliably start each route at the top: the persistent Shell means the window
  // scroll position can otherwise carry over from the previous route on navigation.
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <motion.div
      className={styles.shell}
      style={{
        '--accent': accentVar,
        '--accent-ink': accentInkVar,
        // static target — the title period jumps straight to the new ink, no morph
        '--accent-ink-to': to.accentInk,
        '--on-accent': onAccent,
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
