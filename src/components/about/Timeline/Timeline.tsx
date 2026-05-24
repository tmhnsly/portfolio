'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { TimelineEntry } from '@/types';
import { DURATION, EASING, OFFSET, STAGGER } from '@/lib/motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import styles from './Timeline.module.scss';

function Item({ entry, index }: { entry: TimelineEntry; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={styles.item}
      initial={reduce ? false : { opacity: 0, y: OFFSET.revealY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
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
          style={{ background: entry.accent }}
          initial={reduce ? false : { scale: 1 }}
          whileInView={reduce ? undefined : { scale: [1, 1.18, 1] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: DURATION.base }}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.yearMobile}>{entry.period}</span>
        <div className={styles.role}>
          {entry.role} <span className={styles.place}>· {entry.place}</span>
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
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <Eyebrow withDot>§ Career timeline · scroll-revealed</Eyebrow>
        <h2 className={styles.title}>
          Where I&rsquo;ve been<span className={styles.accent}>.</span>
        </h2>
      </div>
      <div className={styles.timeline} ref={ref}>
        <div className={styles.spineTrack} aria-hidden>
          <motion.div className={styles.spine} style={reduce ? { scaleY: 1 } : { scaleY }} />
        </div>
        {entries.map((e, i) => (
          <Item key={e.id} entry={e} index={i} />
        ))}
      </div>
    </section>
  );
}
