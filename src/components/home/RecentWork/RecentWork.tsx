'use client';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Project } from '@/types';
import { DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import { projectPresentation } from '@/lib/project-presentation';
import { splitFeatured } from '@/lib/facets';
import { IMG_SIZES } from '@/lib/breakpoints';
import { DURATION, EASING } from '@/lib/motion';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FilterPills, useFacets } from '@/components/ui/FilterPills';
import { ProjectThumb } from '@/components/project-thumbs';
import { Pill } from '@/components/ui/Pill';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { CardArrow } from '@/components/ui/CardArrow';
import { ProjectCard } from '@/components/section/ProjectCard';
import styles from './RecentWork.module.scss';

// stable (module-scope) facet accessor — a Project's Discipline label
const disciplineLabel = (p: Project) => DISCIPLINES[p.discipline].label;
const DISCIPLINE_LABELS = DISCIPLINE_ORDER.map((s) => DISCIPLINES[s].label);

export function RecentWork({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const { filters, active, setActive, activeLabel, filtered } = useFacets(projects, disciplineLabel, DISCIPLINE_LABELS);
  const { featured, rest: thumbs } = splitFeatured(filtered, 3);
  if (!featured) return null;

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div>
          <Eyebrow>{COPY.home.selectedWork}</Eyebrow>
          <h2 className={styles.title}>{COPY.home.recent}<span className={styles.period}>.</span></h2>
        </div>
        <FilterPills items={filters} active={active} onSelect={setActive} />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeLabel}
          className={styles.grid}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: DURATION.fast, ease: EASING.standard }}
        >
          <ProjectCard project={featured} featured />
          <div className={styles.thumbs}>
            {thumbs.map((p) => {
              const tp = projectPresentation(p);
              return (
                <Link key={p.slug} href={tp.href} className={styles.thumb}>
                  <ProjectThumb project={p} grad={tp.gradient}
                    ratio="4/3" sizes={IMG_SIZES.thumb} className={styles.thumbMedia} />
                  <div className={styles.thumbMeta}>
                    <div className={styles.thumbTitle}>{p.title}</div>
                    {p.desc && <div className={styles.thumbDesc}>{p.desc}</div>}
                    <span className={styles.pill}><Pill label={tp.label} tone="discipline" color={tp.color} onColor={tp.onColor} /></span>
                  </div>
                  <CardArrow className={styles.arrow} />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className={styles.foot}>
        <span>{thumbs.length + 1} of {filtered.length} shown</span>
        <Link href={featured ? `/${featured.discipline}` : '/'} className={styles.everything}>{COPY.home.everything} <LinkArrow inline /></Link>
      </div>
    </section>
  );
}
