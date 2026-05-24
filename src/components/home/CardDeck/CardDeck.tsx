'use client';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react';
import type { Project } from '@/types';
import { DURATION, EASING, OFFSET } from '@/lib/motion';
import { DISCIPLINES } from '@/lib/disciplines';
import { Media } from '@/components/ui/Media';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { Button } from '@/components/ui/Button';
import { formatMonthYear } from '@/lib/format';
import styles from './CardDeck.module.scss';

const AUTO_MS = 8000;
const STACK = [
  { y: 0, scale: 1, rotate: 0, opacity: 1 },
  { y: 8, scale: 0.98, rotate: 2, opacity: 0.94 },
  { y: 18, scale: 0.95, rotate: -2, opacity: 0.78 },
  { y: 32, scale: 0.9, rotate: -4, opacity: 0.5 },
];
const pad = (n: number) => String(n).padStart(2, '0');

function CardFace({ project }: { project: Project }) {
  const d = DISCIPLINES[project.discipline];
  return (
    <div className={styles.face}>
      <Media
        grad={d.gradient}
        src={project.cover?.src}
        alt={project.cover?.alt ?? project.title}
        ratio="5/4"
        sizes="(min-width: 1200px) 30vw, 90vw"
        className={styles.thumb}
      >
        <span className={styles.pillTL}><Pill label={d.label} tone="solid" /></span>
        <span className={styles.swatches} aria-hidden>
          {d.swatches.map((c, i) => <span key={i} style={{ background: c }} />)}
        </span>
      </Media>
      <div className={styles.meta}>
        <div className={styles.title}>{project.title}</div>
        {project.desc && <div className={styles.desc}>{project.desc}</div>}
        <div className={styles.foot}>
          <div className={styles.chips}>{project.tech.slice(0, 3).map((t) => <TechChip key={t} label={t} />)}</div>
          <span className={styles.date}>{formatMonthYear(project.date)}</span>
        </div>
      </div>
    </div>
  );
}

export function CardDeck({ items }: { items: Project[] }) {
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const transition = reduce ? { duration: 0 } : { duration: DURATION.medium, ease: EASING.standard };

  const advance = useCallback((dir: number) => setIndex((i) => (i + dir + n) % n), [n]);

  useEffect(() => {
    if (reduce || hovered || n <= 1) return;
    const id = setInterval(() => advance(1), AUTO_MS);
    return () => clearInterval(id);
  }, [reduce, hovered, n, advance]);

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.x < -60) advance(1);
    else if (info.offset.x > 60) advance(-1);
  };

  if (n === 0) return null;

  return (
    <div className={styles.wrap}>
      <div
        className={styles.deck}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured work"
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') advance(1);
          if (e.key === 'ArrowLeft') advance(-1);
        }}
      >
        {[3, 2, 1].filter((d) => d < n).map((depth) => {
          const p = items[(index + depth) % n];
          const s = STACK[depth];
          return (
            <motion.div key={`slot-${depth}`} className={styles.card} style={{ zIndex: 10 - depth }}
              animate={{ y: s.y, scale: s.scale, rotate: s.rotate, opacity: s.opacity }} transition={transition}>
              <CardFace project={p} />
            </motion.div>
          );
        })}
        <AnimatePresence initial={false}>
          <motion.div key={`front-${index}`} className={styles.card} style={{ zIndex: 10 }}
            initial={reduce ? false : { y: STACK[1].y, scale: STACK[1].scale, rotate: STACK[1].rotate, opacity: STACK[1].opacity }}
            animate={{ y: 0, scale: 1, rotate: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: OFFSET.deckX, rotate: OFFSET.deckRotate, opacity: 0 }}
            transition={transition}
            drag={reduce ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4} onDragEnd={onDragEnd}>
            <CardFace project={items[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <span className={styles.ticks} aria-hidden>
          {items.map((_, i) => <span key={i} className={i === index ? styles.tickActive : styles.tick} />)}
        </span>
        <span className={styles.counter}>{pad(index + 1)} / {pad(n)}</span>
        <span className={styles.buttons}>
          <Button variant="icon" aria-label="previous" onClick={() => advance(-1)}>←</Button>
          <Button variant="icon" aria-label="next" onClick={() => advance(1)}>→</Button>
        </span>
      </div>
    </div>
  );
}
