'use client';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo, type Variants } from 'motion/react';
import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { Media } from '@/components/ui/Media';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { Button } from '@/components/ui/Button';
import { formatMonthYear } from '@/lib/format';
import styles from './CardDeck.module.scss';

const AUTO_MS = 8000;
const VISIBLE = 3;            // front card + 2 peeking behind
const PEEK_Y = 16;           // px each card sits below the one in front
const PEEK_SCALE = 0.05;     // scale step per depth
const SWIPE_DIST = 80;       // px offset to count as a swipe
const SWIPE_VELOCITY = 450;  // or fast enough flick

const stackSpring = { type: 'spring', stiffness: 340, damping: 34, mass: 0.9 } as const;

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
        sizes="(min-width: 1200px) 30vw, (min-width: 768px) 40vw, 90vw"
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
  // `order` holds item indices; order[0] is the front card. Advancing rotates it,
  // so every card springs to its new stack slot together (feels like a real deck).
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const [dir, setDir] = useState(-1); // exit/enter direction for the swap
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  const advance = useCallback((d: number) => {
    setDir(d);
    setOrder((o) => (d < 0 ? [...o.slice(1), o[0]] : [o[o.length - 1], ...o.slice(0, -1)]));
  }, []);

  const jumpTo = useCallback((itemIndex: number) => {
    setOrder((o) => {
      const k = o.indexOf(itemIndex);
      if (k <= 0) return o;
      setDir(-1);
      return [...o.slice(k), ...o.slice(0, k)];
    });
  }, []);

  useEffect(() => {
    if (reduce || hovered || n <= 1) return;
    const id = setInterval(() => advance(-1), AUTO_MS);
    return () => clearInterval(id);
  }, [reduce, hovered, n, advance]);

  if (n === 0) return null;

  const visible = order.slice(0, Math.min(VISIBLE, n));
  const activeIndex = order[0];

  // enter/stack are position-driven (custom = pos); exit flies in the swap
  // direction (closure `dir`), so the same card never mixes the two up.
  const variants: Variants = {
    enter: (pos: number) => ({ y: pos * PEEK_Y, scale: 1 - pos * PEEK_SCALE, opacity: 0, x: 0, rotate: 0 }),
    stack: (pos: number) => ({ y: pos * PEEK_Y, scale: 1 - pos * PEEK_SCALE, opacity: 1, x: 0, rotate: 0 }),
    exit: reduce ? { opacity: 0 } : { x: dir * 460, rotate: dir * -8, opacity: 0 },
  };

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DIST || info.velocity.x < -SWIPE_VELOCITY) advance(-1);
    else if (info.offset.x > SWIPE_DIST || info.velocity.x > SWIPE_VELOCITY) advance(1);
  };

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
          if (e.key === 'ArrowRight') advance(-1);
          if (e.key === 'ArrowLeft') advance(1);
        }}
      >
        <AnimatePresence initial={false} custom={dir}>
          {visible.map((itemIndex, pos) => {
            const isFront = pos === 0;
            return (
              <motion.div
                key={itemIndex}
                className={`${styles.card} ${isFront ? styles.cardFront : ''}`}
                style={{ zIndex: VISIBLE - pos }}
                custom={pos}
                variants={variants}
                initial="enter"
                animate="stack"
                exit="exit"
                transition={reduce ? { duration: 0 } : stackSpring}
                drag={isFront && !reduce ? 'x' : false}
                dragElastic={0.6}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isFront ? onDragEnd : undefined}
              >
                {isFront ? <CardFace project={items[itemIndex]} /> : <div className={styles.face} aria-hidden />}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <span className={styles.ticks}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === activeIndex ? styles.tickActive : styles.tick}
              aria-label={`Show item ${i + 1}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              onClick={() => jumpTo(i)}
            />
          ))}
        </span>
        <span className={styles.counter}>{pad(activeIndex + 1)} / {pad(n)}</span>
        <span className={styles.buttons}>
          <Button variant="icon" aria-label="previous" onClick={() => advance(1)}>←</Button>
          <Button variant="icon" aria-label="next" onClick={() => advance(-1)}>→</Button>
        </span>
      </div>
    </div>
  );
}
