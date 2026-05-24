'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo, type Variants } from 'motion/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import type { Project } from '@/types';
import { EASING } from '@/lib/motion';
import { DISCIPLINES } from '@/lib/disciplines';
import { Media } from '@/components/ui/Media';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import styles from './CardDeck.module.scss';

const AUTO_MS = 8000;
const VISIBLE = 3;            // front card + 2 peeking behind
const PEEK_Y = 16;           // px each card sits below the one in front
const PEEK_SCALE = 0.05;     // scale step per depth
const SWIPE_DIST = 64;       // small pointer offset is enough — it's a flick, not a drag
const SWIPE_VELOCITY = 300;  // a quick flick advances even without much travel

// softer, near-critically-damped spring → a weighty, smooth glide (was 340/34/0.9,
// which snapped/settled hard). The exit fly-off uses its own quick ease (below).
const stackSpring = { type: 'spring', stiffness: 240, damping: 30, mass: 1 } as const;

const pad = (n: number) => String(n).padStart(2, '0');

function CardFace({ project }: { project: Project }) {
  const d = DISCIPLINES[project.discipline];
  return (
    // The whole front card links to the project. A flick drags the card and Motion
    // suppresses the trailing click, so only a real (non-dragged) click navigates.
    <Link href={`/${project.discipline}/${project.slug}`} className={styles.face} draggable={false}>
      <Media
        grad={d.gradient}
        src={project.cover?.src}
        alt={project.cover?.alt ?? project.title}
        ratio="5/4"
        sizes="(min-width: 1200px) 30vw, (min-width: 768px) 40vw, 90vw"
        className={styles.thumb}
      />
      <div className={styles.meta}>
        <div className={styles.title}>{project.title}</div>
        {project.desc && <div className={styles.desc}>{project.desc}</div>}
        <span className={styles.pill}><Pill label={d.label} tone="discipline" color={d.color} /></span>
      </div>
    </Link>
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
  // one advance per gesture — a fast mobile swipe was firing several at once
  const lockUntil = useRef(0);

  const advance = useCallback((d: number) => {
    const now = Date.now();
    if (now < lockUntil.current) return;
    lockUntil.current = now + 380;
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
    exit: reduce
      ? { opacity: 0 }
      : { x: dir * 480, rotate: dir * -6, opacity: 0, transition: { duration: 0.32, ease: EASING.standard } },
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
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
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
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                dragMomentum={false}
                onDragEnd={isFront ? onDragEnd : undefined}
              >
                {isFront ? (
                  <motion.div
                    className={styles.faceFade}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: EASING.standard }}
                  >
                    <CardFace project={items[itemIndex]} />
                  </motion.div>
                ) : (
                  <div className={styles.face} aria-hidden />
                )}
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
          <Button variant="icon" aria-label="previous" onClick={() => advance(1)}><BiChevronLeft className={styles.caret} aria-hidden /></Button>
          <Button variant="icon" aria-label="next" onClick={() => advance(-1)}><BiChevronRight className={styles.caret} aria-hidden /></Button>
        </span>
      </div>
    </div>
  );
}
