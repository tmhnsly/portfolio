'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';

// useLayoutEffect on the client (runs before paint), useEffect on the server (no-op, no SSR warning)
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
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
  const shellRef = useRef<HTMLDivElement>(null);

  // Reliably start each route at the top: the persistent Shell means the window
  // scroll position can otherwise carry over from the previous route on navigation.
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  // On a zone change React commits the accent strings (--accent-to etc.)
  // synchronously, but --zone-mix is a MotionValue motion writes on its own
  // frame — so for one frame the new --accent-to would paint against a stale
  // --zone-mix (=1), flashing straight to the target colour before the morph
  // runs. Flush the reset mix to the DOM before paint to keep the morph clean.
  useIsomorphicLayoutEffect(() => {
    shellRef.current?.style.setProperty('--zone-mix', String(mix.get()));
  }, [to, mix]);

  return (
    <motion.div
      ref={shellRef}
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
