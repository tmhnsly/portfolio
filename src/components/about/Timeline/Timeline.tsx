'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { TimelineEntry } from '@/types';
import { DURATION, EASING, OFFSET, STAGGER } from '@/lib/motion';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import styles from './Timeline.module.scss';

function Item({ entry, index }: { entry: TimelineEntry; index: number }) {
  const reduce = useReducedMotion();
  // place is "Company · Location" — link only the company when a URL is set
  const [company, ...locParts] = entry.place.split(' · ');
  const location = locParts.join(' · ');
  return (
    <motion.div
      className={styles.item}
      initial={reduce ? false : { opacity: 0, y: OFFSET.revealY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: DURATION.reveal,
        ease: EASING.standard,
        delay: reduce ? 0 : index * STAGGER.entries,
      }}
    >
      <div className={styles.year}>{entry.period}</div>
      <div className={styles.markerCol}>
        <motion.span
          className={styles.marker}
          style={{ background: entry.accent, '--marker-glow': `color-mix(in srgb, ${entry.accent} 25%, transparent)` } as React.CSSProperties}
          initial={reduce ? false : { scale: 1 }}
          whileInView={reduce ? undefined : { scale: [1, 1.18, 1] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: DURATION.base }}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.yearMobile}>{entry.period}</span>
        <div className={styles.role}>
          {entry.role}{' '}
          <span className={styles.place}>
            ·{' '}
            {entry.companyUrl ? (
              <a className={styles.placeLink} href={entry.companyUrl} target="_blank" rel="noopener noreferrer">
                {company}
              </a>
            ) : (
              company
            )}
            {location && ` · ${location}`}
          </span>
        </div>
        <p className={styles.desc}>{entry.description}</p>
        <div className={styles.chips}>
          {entry.tags.map((t) => (
            <TechChip key={t} label={t} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const reduce = useReducedMotion();
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <Eyebrow withDot>{COPY.about.timelineEyebrow}</Eyebrow>
        <h2 className={styles.title}>
          {COPY.about.timelineHeading}<span className={styles.accent}>.</span>
        </h2>
      </div>
      <div className={styles.timeline}>
        <div className={styles.spineTrack} aria-hidden>
          <motion.div
            className={styles.spine}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={reduce ? { scaleY: 1 } : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: DURATION.reveal, ease: EASING.standard }}
          />
        </div>
        {entries.map((e, i) => (
          <Item key={e.id} entry={e} index={i} />
        ))}
      </div>
    </section>
  );
}
