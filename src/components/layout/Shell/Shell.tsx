'use client';
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
 * survive navigation and can animate the zone change, instead of remounting
 * per route. `usePathname()` resolves during SSR, so the accent is correct on
 * first paint (no flash); the colour transition is only enabled after mount.
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
  const { discipline, active, accent, accentInk, onAccent } = resolveZone(pathname);

  // The accent transition (Shell.module.scss) only fires on a *change* of
  // --accent/--accent-ink. On first load the values are already in the SSR'd
  // inline style, so CSS doesn't transition them — no flash. They animate only
  // when navigation swaps the values.
  return (
    <div
      className={styles.shell}
      style={{ '--accent': accent, '--accent-ink': accentInk, '--on-accent': onAccent } as React.CSSProperties}
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
    </div>
  );
}
