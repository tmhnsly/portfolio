'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Discipline } from '@/types';
import type { BreadcrumbData } from '@/lib/content';
import { buildCrumbs } from '@/lib/breadcrumb';
import { DURATION, EASING } from '@/lib/motion';
import { DisciplineDot } from '@/components/ui/DisciplineDot';
import { Rolling } from '@/components/motion/Roll';
import { Container } from '../Container';
import styles from './Breadcrumb.module.scss';

/**
 * One persistent breadcrumb for every route (Home / Section / Leaf), living in
 * the Shell so its position never shifts and it carries across navigation. The
 * trail rules live in `lib/breadcrumb` (buildCrumbs); this is the render layer.
 * The changing segment + count slide via <Rolling>; appearing/disappearing
 * crumbs fade-slide. The leading dot reads --accent, so it matches the zone.
 */
export function Breadcrumb({ data, discipline }: { data: BreadcrumbData; discipline?: Discipline }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // discipline comes resolved from the Shell (the Zone owner); buildCrumbs derives
  // it from the pathname only as a fallback for callers that don't have it.
  const crumbs = buildCrumbs(pathname, data, discipline);
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
                <motion.li key="leaf" className={`${styles.crumb} ${styles.leaf}`} {...motionProps}>
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
