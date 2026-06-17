'use client';
import Link from 'next/link';
import { type KeyboardEvent } from 'react';
import { AnimatePresence, motion, type PanInfo, type Variants } from 'motion/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import type { Project } from '@/types';
import { EASING } from '@/lib/motion';
import { IMG_SIZES } from '@/lib/breakpoints';
import { projectPresentation } from '@/lib/project-presentation';
import { swipeDir } from '@/lib/deck';
import { pad2 } from '@/lib/format';
import { ProjectThumb } from '@/components/project-thumbs';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { useDeck } from './useDeck';
import styles from './CardDeck.module.scss';

const VISIBLE = 3;            // front card + 2 peeking behind
const PEEK_Y = 16;           // px each card sits below the one in front
const PEEK_SCALE = 0.05;     // scale step per depth
const SWIPE_DIST = 64;       // small pointer offset is enough — it's a flick, not a drag
const SWIPE_VELOCITY = 300;  // a quick flick advances even without much travel

// softer, near-critically-damped spring → a weighty, smooth glide (was 340/34/0.9,
// which snapped/settled hard). The exit recede uses its own ease (below).
const stackSpring = { type: 'spring', stiffness: 240, damping: 30, mass: 1 } as const;

function CardFace({ project, priority }: { project: Project; priority?: boolean }) {
  const p = projectPresentation(project);
  return (
    // The whole front card links to the project. A flick drags the card and Motion
    // suppresses the trailing click, so only a real (non-dragged) click navigates.
    <Link href={p.href} className={styles.face} draggable={false}>
      <ProjectThumb
        project={project}
        ratio="5/4"
        sizes={IMG_SIZES.deck}
        priority={priority}
        className={styles.thumb}
      />
      <div className={styles.meta}>
        <div className={styles.title}>{project.title}</div>
        {project.desc && <div className={styles.desc}>{project.desc}</div>}
        <span className={styles.pill}><Pill label={p.label} tone="discipline" color={p.color} onColor={p.onColor} /></span>
      </div>
    </Link>
  );
}

export function CardDeck({ items }: { items: Project[] }) {
  const n = items.length;
  // The deck's state machine, gesture lock, and off-screen-paused auto-advance live
  // in useDeck; this component just maps gestures/keys to advance/jumpTo and renders.
  const { order, dir, activeIndex, reduce, wrapRef, advance, jumpTo, onPointerEnter, onPointerLeave } = useDeck(n);

  // ←/→ flip the deck from anywhere inside it: keydown bubbles up to the wrap, so it
  // fires whether the front card OR a control (prev/next/tick) is focused — no
  // focusable container, no giant ring. If the front CARD is the focused element it
  // unmounts on advance, so move focus to the matching prev/next button (stable, stays
  // in the deck) — keyboard focus is never dropped to <body>.
  const onArrowKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const wrap = wrapRef.current;
    const deck = wrap?.querySelector('[aria-roledescription="carousel"]');
    const cardFocused = !!deck && deck.contains(document.activeElement);
    advance(e.key === 'ArrowRight' ? -1 : 1);
    if (cardFocused) {
      const label = e.key === 'ArrowRight' ? 'next' : 'previous';
      wrap?.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)?.focus();
    }
  };

  if (n === 0) return null;

  const visible = order.slice(0, Math.min(VISIBLE, n));

  // enter/stack are position-driven (custom = pos). It reads like a real deck shuffle:
  // a JOINING card rises from one slot deeper in the stack to its slot (bring-to-front),
  // and the LEAVING card recedes down into the back of the deck (put-to-back) with a
  // small slide in the swap direction (closure `dir`) — never a viewport fly-off.
  const variants: Variants = {
    enter: (pos: number) => ({ y: (pos + 1) * PEEK_Y, scale: 1 - (pos + 1) * PEEK_SCALE, opacity: 0, x: 0, rotate: 0 }),
    stack: (pos: number) => ({ y: pos * PEEK_Y, scale: 1 - pos * PEEK_SCALE, opacity: 1, x: 0, rotate: 0 }),
    exit: reduce
      ? { opacity: 0 }
      : {
          x: dir * 36,
          y: VISIBLE * PEEK_Y,
          scale: 1 - (VISIBLE + 1) * PEEK_SCALE,
          rotate: dir * 3,
          opacity: 0,
          transition: { duration: 0.34, ease: EASING.standard },
        },
  };

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const d = swipeDir(info.offset.x, info.velocity.x, SWIPE_DIST, SWIPE_VELOCITY);
    if (d) advance(d);
  };

  return (
    <div className={styles.wrap} ref={wrapRef} onKeyDown={onArrowKey}>
      {/* A labelled region for screen readers, but NOT a tab stop: making the whole
          deck focusable drew a big focus ring around the stack. Keyboard control is the
          prev/next + tick buttons below (they persist across advances) plus ←/→ arrows,
          handled on the wrap (onArrowKey) so they work from the card or the controls. */}
      <div
        className={styles.deck}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured work"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
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
                    {/* front card is above the fold → eager-load its poster (the LCP) */}
                    <CardFace project={items[itemIndex]!} priority />
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
        <span className={styles.counter}>{pad2(activeIndex + 1)} / {pad2(n)}</span>
        <span className={styles.buttons}>
          <Button variant="icon" aria-label="previous" onClick={() => advance(1)}><BiChevronLeft className={styles.caret} aria-hidden /></Button>
          <Button variant="icon" aria-label="next" onClick={() => advance(-1)}><BiChevronRight className={styles.caret} aria-hidden /></Button>
        </span>
      </div>
    </div>
  );
}
