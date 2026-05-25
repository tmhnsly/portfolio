'use client';
import { usePathname } from 'next/navigation';
import type { Discipline } from '@/types';
import { DISCIPLINES, isDiscipline } from '@/lib/disciplines';
import { Nav } from '../Nav';
import { Footer } from '../Footer';
import { Bloom } from '../Bloom';
import { Breadcrumb } from '../Breadcrumb';
import styles from './Shell.module.scss';

/** The current "zone" derived from the URL — drives accent, bloom and nav highlight. */
function zoneFromPath(pathname: string): { discipline?: Discipline; active?: string } {
  const seg = pathname.split('/')[1] ?? '';
  if (!seg) return {}; // home → default accent, no nav highlight
  const discipline = isDiscipline(seg) ? seg : undefined; // 'about' → undefined (tomato)
  return { discipline, active: seg };
}

/**
 * Persistent app shell. Lives once in the root layout so the bloom and nav
 * survive navigation and can animate the zone change, instead of remounting
 * per route. `usePathname()` resolves during SSR, so the accent is correct on
 * first paint (no flash); the colour transition is only enabled after mount.
 */
export function Shell({
  children,
  projectCounts,
  titleMap,
  postCount,
}: {
  children: React.ReactNode;
  projectCounts: Partial<Record<Discipline, number>>;
  titleMap: Record<string, string>;
  postCount: number;
}) {
  const pathname = usePathname();
  const { discipline, active } = zoneFromPath(pathname);
  const meta = discipline ? DISCIPLINES[discipline] : null;
  // default zone (home/about) = tomato brand accent
  const accent = meta ? meta.color : 'var(--tomato-9)';
  const accentInk = meta ? meta.ink : 'var(--tomato-11)';
  const onAccent = meta ? meta.onAccent : 'var(--white-a12)';

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
      <Nav active={active} />
      <main className={styles.content}>
        {/* persistent breadcrumb — one consistent, clickable trail for every
            route, so its position never shifts and the changing segment rolls */}
        <Breadcrumb projectCounts={projectCounts} titleMap={titleMap} postCount={postCount} />
        {children}
      </main>
      <Footer />
    </div>
  );
}
