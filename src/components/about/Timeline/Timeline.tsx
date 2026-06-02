'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { TimelineEntry } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { DURATION, EASING, OFFSET, STAGGER } from '@/lib/motion';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { CardArrow } from '@/components/ui/CardArrow';
import styles from './Timeline.module.scss';

// place is "Company · Location" — split so the logo tile + heading can use each part
function splitPlace(place: string) {
  const [company, ...rest] = place.split(' · ');
  return { company, location: rest.join(' · ') };
}

// Logo tile: a real logo image when one is set, otherwise a discipline-tinted
// monogram (initials). Drop a file in public/images/about/logos/ + set `logo`.
function LogoTile({ entry, company }: { entry: TimelineEntry; company: string }) {
  if (entry.logo) {
    // eslint-disable-next-line @next/next/no-img-element -- small brand mark, not a content image
    return <span className={styles.logoTile}><img src={entry.logo} alt="" className={styles.logoImg} /></span>;
  }
  return (
    <span className={styles.logoTile} aria-hidden>
      {entry.monogram ?? company.charAt(0).toUpperCase()}
    </span>
  );
}

function Item({ entry, index }: { entry: TimelineEntry; index: number }) {
  const reduce = useReducedMotion();
  const d = DISCIPLINES[entry.discipline];
  const { company, location } = splitPlace(entry.place);
  const linked = Boolean(entry.companyUrl);

  // discipline colour, exposed to the card + dot as theme-aware CSS vars
  const colourVars = {
    '--tl-fill': d.color,
    '--tl-on': d.onAccent,
    '--tl-ink': d.ink,
    '--tl-glow': `color-mix(in srgb, ${d.color} 25%, transparent)`,
  } as React.CSSProperties;

  const cardInner = (
    <>
      <span className={styles.yearMobile}>{entry.period}</span>
      <div className={styles.cardHead}>
        <motion.span
          className={styles.logoWrap}
          initial={reduce ? false : { scale: 0.82, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: DURATION.base, ease: EASING.standard, delay: reduce ? 0 : index * STAGGER.entries + 0.08 }}
        >
          <LogoTile entry={entry} company={company} />
        </motion.span>
        <div className={styles.headText}>
          <div className={styles.role}>{entry.role}</div>
          <div className={styles.place}>
            {company}
            {location && <span className={styles.loc}> · {location}</span>}
          </div>
        </div>
        {linked && <CardArrow className={styles.arrow} />}
      </div>
      <p className={styles.desc}>{entry.description}</p>
      <div className={styles.chips}>
        {entry.tags.map((t) => (
          <TechChip key={t} label={t} />
        ))}
      </div>
    </>
  );

  return (
    <motion.div
      className={styles.item}
      style={colourVars}
      initial={reduce ? false : { opacity: 0, y: OFFSET.revealY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: DURATION.reveal, ease: EASING.standard, delay: reduce ? 0 : index * STAGGER.entries }}
    >
      <div className={styles.year}>{entry.period}</div>
      <div className={styles.markerCol}>
        <motion.span
          className={styles.marker}
          initial={reduce ? false : { scale: 1 }}
          whileInView={reduce ? undefined : { scale: [1, 1.18, 1] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: DURATION.base }}
        />
      </div>
      {linked ? (
        <a className={styles.card} href={entry.companyUrl} target="_blank" rel="noopener noreferrer">
          {cardInner}
        </a>
      ) : (
        <div className={`${styles.card} ${styles.cardStatic}`}>{cardInner}</div>
      )}
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
            whileInView={{ scaleY: 1 }}
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
