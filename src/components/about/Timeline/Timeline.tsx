'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { TimelineEntry } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { useMounted } from '@/lib/motion';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { CardArrow } from '@/components/ui/CardArrow';
import styles from './Timeline.module.scss';

// place is "Company · Location" — split so the chip + heading can use each part
function splitPlace(place: string) {
  const [company = place, ...rest] = place.split(' · ');
  return { company, location: rest.join(' · ') };
}

// A white chip holding the company's real logo, or a discipline-ink monogram
// when there's no logo (e.g. self-employed, or a company with no live site).
function LogoChip({ entry, company }: { entry: TimelineEntry; company: string }) {
  return (
    <span className={styles.logoChip}>
      {entry.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- small brand mark, not a content image
        <img
          src={entry.logo}
          alt={`${company} logo`}
          className={`${styles.logoImg}${entry.logoFilled ? ` ${styles.logoImgFilled}` : ''}`}
        />
      ) : (
        <span className={styles.logoMono} aria-hidden>
          {entry.monogram ?? company.charAt(0).toUpperCase()}
        </span>
      )}
    </span>
  );
}

function Item({ entry }: { entry: TimelineEntry }) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !reduce;
  const ref = useRef<HTMLDivElement>(null);
  // 0 as the item enters from the bottom, ~0.5 as its centre crosses the viewport
  // centre, 1 as it leaves the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Depth focus: the card grows to full size and brightens as it nears the centre,
  // then recedes (smaller, dimmer) toward either edge — a gentle roll, not a pop.
  // A plateau across the middle keeps it calm rather than always-in-motion.
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.55, 1, 1, 0.55]);
  // The dot swells as its entry takes focus, so the active step reads clearly.
  const dotScale = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [0.82, 1, 1.18, 1, 0.82]);

  const d = DISCIPLINES[entry.discipline];
  const { company, location } = splitPlace(entry.place);
  const linked = Boolean(entry.companyUrl);

  // discipline colour, exposed to the card + rail dot as theme-aware CSS vars
  const colourVars = {
    '--tl-fill': d.color,
    '--tl-ink': d.ink,
    '--tl-glow': `color-mix(in srgb, ${d.color} 25%, transparent)`,
  } as React.CSSProperties;

  const cardInner = (
    <>
      <span className={styles.yearMobile}>{entry.period}</span>
      {/* the logo is static — only the card animates on reveal/hover (a separate
          logo pop read as too much) */}
      <span className={styles.logoWrap}>
        <LogoChip entry={entry} company={company} />
      </span>
      {linked && <CardArrow className={styles.arrow} />}
      <div className={styles.headText}>
        <div className={styles.role}>{entry.role}</div>
        <div className={styles.place}>
          {company}
          {location && <span className={styles.loc}> · {location}</span>}
        </div>
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
    <div className={styles.item} style={colourVars} ref={ref}>
      <div className={styles.year}>{entry.period}</div>
      <div className={styles.markerCol}>
        <motion.span className={styles.marker} style={animate ? { scale: dotScale } : undefined} />
      </div>
      {/* depth lives on the wrapper so the card keeps its own hover transform */}
      <motion.div className={styles.cardWrap} style={animate ? { scale, opacity } : undefined}>
        {linked ? (
          <a className={styles.card} href={entry.companyUrl} target="_blank" rel="noopener noreferrer">
            {cardInner}
          </a>
        ) : (
          <div className={`${styles.card} ${styles.cardStatic}`}>{cardInner}</div>
        )}
      </motion.div>
    </div>
  );
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const railRef = useRef<HTMLDivElement>(null);
  // The accent fill draws down the rail in step with how far you've scrolled
  // through the timeline (top of list at centre → empty, bottom at centre → full).
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start center', 'end center'] });

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <Eyebrow withDot>{COPY.about.timelineEyebrow}</Eyebrow>
        <h2 className={styles.title}>
          {COPY.about.timelineHeading}<span className={styles.accent}>.</span>
        </h2>
      </div>
      <div className={styles.timeline} ref={railRef}>
        <span className={styles.rail} aria-hidden />
        {mounted && !reduce && (
          <motion.span className={styles.railFill} style={{ scaleY: scrollYProgress }} aria-hidden />
        )}
        {entries.map((e) => (
          <Item key={e.id} entry={e} />
        ))}
      </div>
    </section>
  );
}
