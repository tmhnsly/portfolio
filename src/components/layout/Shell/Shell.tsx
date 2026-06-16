'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { BreadcrumbData } from '@/lib/content';
import { resolveZone } from '@/lib/zone';
import { Nav } from '../Nav';
import { Footer } from '../Footer';
import { Bloom } from '../Bloom';
import { Breadcrumb } from '../Breadcrumb';
import styles from './Shell.module.scss';

/**
 * Persistent app shell. Lives once in the root layout so the bloom and nav
 * survive navigation and can transition the zone change in place, instead of
 * remounting per route. `usePathname()` resolves during SSR, so the accent is
 * correct on first paint (no flash).
 *
 * Its job is orchestration: resolve the Zone, set the accent tokens, and thread
 * them to Bloom/Nav/Breadcrumb. The accent SNAPS to the route here — interpolating
 * the colour ran through muddy OKLab midpoints between distant hues. Instead the
 * Nav crossfades its accent chrome and the Bloom crossfades the tint by opacity,
 * so the change reads as a clean dissolve with no in-between colour.
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
  const { discipline, active, accent, accentInk, accentHover, onAccent } = resolveZone(pathname);

  // Reliably start each route at the top: the persistent Shell means the window
  // scroll position can otherwise carry over from the previous route on navigation.
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div
      className={styles.shell}
      style={{
        '--accent': accent,
        '--accent-ink': accentInk,
        '--accent-ink-to': accentInk, // the title period reads this — now just the accent ink
        '--accent-hover': accentHover, // step-10 — solid hover for accent fills (Button, nav CTA)
        '--on-accent': onAccent,
      } as React.CSSProperties}
    >
      {/* First focusable element on every route: lets keyboard/SR users skip the
          persistent Nav + Breadcrumb straight to page content. Off-screen until
          focused (see Shell.module.scss). */}
      <a href="#main" className={styles.skipLink}>Skip to content</a>
      <Bloom zone={discipline ?? 'default'} tint={accent} />
      <Nav active={active} accent={accent} accentInk={accentInk} accentHover={accentHover} onAccent={onAccent} />
      <main id="main" className={styles.content}>
        {/* persistent breadcrumb — one consistent, clickable trail for every
            route, so its position never shifts and the changing segment rolls */}
        <Breadcrumb data={breadcrumbData} discipline={discipline} />
        {children}
      </main>
      <Footer />
    </div>
  );
}
