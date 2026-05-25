'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Discipline } from '@/types';
import { DISCIPLINES, isDiscipline } from '@/lib/disciplines';
import { DURATION, EASING } from '@/lib/motion';
import { DisciplineDot } from '@/components/ui/DisciplineDot';
import { Rolling } from '@/components/motion/Roll';
import { Container } from '../Container';
import styles from './Breadcrumb.module.scss';

interface Crumb {
  slot: 'home' | 'section' | 'leaf';
  label: string;
  href?: string;
  count?: number;
  unit?: string;
}

const humanize = (slug: string) =>
  slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

/** Build the crumb trail from the pathname: Home / Section (· N) / Leaf. */
function buildCrumbs(
  pathname: string,
  titleMap: Record<string, string>,
  projectCounts: Partial<Record<Discipline, number>>,
  postCount: number,
): Crumb[] {
  const segs = pathname.split('/').filter(Boolean);
  const home: Crumb = { slot: 'home', label: 'Home', href: segs.length ? '/' : undefined };
  if (segs.length === 0) return [home];

  const first = segs[0];
  if (first === 'about') return [home, { slot: 'section', label: 'About' }];

  if (isDiscipline(first)) {
    const label = DISCIPLINES[first].label;
    if (segs.length === 1) {
      const count = first === 'blog' ? postCount : projectCounts[first] ?? 0;
      const noun = first === 'blog' ? 'post' : 'project';
      return [home, { slot: 'section', label, count, unit: `${noun}${count === 1 ? '' : 's'}` }];
    }
    const path = `/${first}/${segs[1]}`;
    return [
      home,
      { slot: 'section', label, href: `/${first}` },
      { slot: 'leaf', label: titleMap[path] ?? humanize(segs[1]) },
    ];
  }
  return [home, { slot: 'section', label: humanize(first) }];
}

/**
 * One persistent breadcrumb for every route (Home / Section / Leaf), living in
 * the Shell so its position never shifts and it carries across navigation. The
 * changing segment + count slide via <Rolling>; appearing/disappearing crumbs
 * fade-slide. The leading dot reads --accent, so it matches the zone.
 */
export function Breadcrumb({
  projectCounts,
  titleMap,
  postCount,
}: {
  projectCounts: Partial<Record<Discipline, number>>;
  titleMap: Record<string, string>;
  postCount: number;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const crumbs = buildCrumbs(pathname, titleMap, projectCounts, postCount);
  const home = crumbs[0];
  const section = crumbs.find((c) => c.slot === 'section');
  const leaf = crumbs.find((c) => c.slot === 'leaf');

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, x: -6 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 6 },
        transition: { duration: DURATION.base, ease: EASING.standard },
      };

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <Container>
        <div className={styles.bar}>
          <DisciplineDot />
          <ol className={styles.trail}>
            <li className={styles.crumb}>
              {home.href ? (
                <Link href={home.href} className={styles.link}>Home</Link>
              ) : (
                <span className={styles.current} aria-current="page">Home</span>
              )}
            </li>

            <AnimatePresence mode="popLayout" initial={false}>
              {section && (
                <motion.li key="section" className={styles.crumb} {...motionProps}>
                  <span className={styles.sep} aria-hidden>/</span>
                  {section.href ? (
                    <Link href={section.href} className={styles.link}>
                      <Rolling value={section.label} className={styles.linkRoll} />
                    </Link>
                  ) : (
                    <span className={styles.current} aria-current={leaf ? undefined : 'page'}>
                      <Rolling value={section.label} />
                      {section.count != null && (
                        <span className={styles.meta}>
                          {' · '}
                          <Rolling value={section.count} /> {section.unit}
                        </span>
                      )}
                    </span>
                  )}
                </motion.li>
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout" initial={false}>
              {leaf && (
                <motion.li key="leaf" className={styles.crumb} {...motionProps}>
                  <span className={styles.sep} aria-hidden>/</span>
                  <span className={styles.current} aria-current="page">
                    <Rolling value={leaf.label} />
                  </span>
                </motion.li>
              )}
            </AnimatePresence>
          </ol>
        </div>
      </Container>
    </nav>
  );
}
