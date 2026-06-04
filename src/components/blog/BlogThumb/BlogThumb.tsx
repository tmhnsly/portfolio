'use client';
/**
 * BlogThumb — the cover a post draws when it ships no image. It picks a motif from
 * the post's content (see pickMotif) and renders a small animated vignette in the
 * blog accent (orange), in the same idiom as the bespoke project thumbnails: pure
 * CSS/SVG, theme-aware via tokens, sized in container-query units, and gated on
 * useReveal so the entrance plays once when scrolled into view. Reduced motion shows
 * the finished state with no animation (the base CSS is the final frame).
 */
import type { BlogPost } from '@/lib/schemas';
import { useReveal } from '@/components/project-thumbs/useReveal';
import { pickMotif, type MotifKey } from './pickMotif';
import styles from './BlogThumb.module.scss';

type Vars = React.CSSProperties & Record<string, string | number>;
const v = (o: Record<string, string | number>) => o as Vars;

// editor: width %, indent level, is-accent (a string/keyword bar)
const CODE_LINES = [
  { w: 54, i: 0 }, { w: 72, i: 1 }, { w: 46, i: 1, a: true },
  { w: 64, i: 2 }, { w: 40, i: 1 }, { w: 58, i: 0 },
];
function Code() {
  return (
    <div className={styles.card}>
      <div className={styles.bar}><span /><span /><span /></div>
      <div className={styles.codeLines}>
        {CODE_LINES.map((l, i) => (
          <span
            key={i}
            className={`${styles.ln} ${l.a ? styles.accent : ''}`}
            style={v({ '--w': `${l.w}%`, '--ml': `${l.i * 9}%`, '--i': i })}
          />
        ))}
        <span className={styles.caret} style={v({ '--i': CODE_LINES.length })} />
      </div>
    </div>
  );
}

const BARS = [38, 64, 30, 86, 52, 74, 34, 60, 44, 70];
function Audio() {
  return (
    <div className={styles.card}>
      <div className={styles.eq}>
        {BARS.map((h, i) => (
          <span key={i} className={styles.bar2} style={v({ '--h': `${h}%`, '--i': i })} />
        ))}
      </div>
      <span className={styles.baseline} />
    </div>
  );
}

const PAGE_LINES = [96, 90, 94, 84, 92, 70];
function Writing() {
  return (
    <div className={`${styles.card} ${styles.sheet}`}>
      <span className={styles.heading} />
      <div className={styles.para}>
        {PAGE_LINES.map((w, i) => (
          <span key={i} className={styles.row} style={v({ '--w': `${w}%`, '--i': i })} />
        ))}
        <span className={styles.penCaret} style={v({ '--i': PAGE_LINES.length })} />
      </div>
    </div>
  );
}

// books standing on a shelf: height %, width (cqmin), is-accent
const SPINES = [
  { h: 80, w: 15 }, { h: 94, w: 17, a: true }, { h: 68, w: 13 },
  { h: 88, w: 18 }, { h: 74, w: 14 },
];
function Reading() {
  return (
    <div className={styles.card}>
      <div className={styles.spines}>
        {SPINES.map((s, i) => (
          <span
            key={i}
            className={`${styles.spine} ${s.a ? styles.accent : ''}`}
            style={v({ '--h': `${s.h}%`, '--w': `${s.w}cqmin`, '--i': i })}
          />
        ))}
      </div>
      <span className={styles.shelfBar} />
    </div>
  );
}

// flow: nodes on a zig-zag, connected by one drawn path; the middle node is accent
const NODES = [{ x: 16, y: 30 }, { x: 50, y: 64 }, { x: 84, y: 24 }, { x: 84, y: 76 }];
const FLOW = 'M16,30 L50,64 L84,24 M50,64 L84,76';
function Process() {
  return (
    <div className={styles.card}>
      <svg viewBox="0 0 100 100" className={styles.flow} aria-hidden>
        <path d={FLOW} className={styles.wire} pathLength={1} strokeDasharray={1} />
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={9}
            className={`${styles.node} ${i === 1 ? styles.accent : ''}`}
            style={v({ '--i': i })}
          />
        ))}
      </svg>
    </div>
  );
}

// datacenter: a small server rack beside a water drop (AI's energy/water cost)
const RACK = [0, 1, 2, 3];
function Datacenter() {
  return (
    <div className={`${styles.card} ${styles.rackCard}`}>
      <div className={styles.rack}>
        {RACK.map((i) => (
          <span key={i} className={`${styles.unit} ${i === 1 ? styles.accent : ''}`} style={v({ '--i': i })}>
            <span className={styles.led} /><span className={styles.led} /><span className={styles.led} />
          </span>
        ))}
      </div>
      <svg className={styles.drop} viewBox="0 0 24 30" aria-hidden>
        <path d="M12 1.5 C12 1.5 21.5 13 21.5 20 A9.5 9.5 0 1 1 2.5 20 C2.5 13 12 1.5 12 1.5 Z" />
      </svg>
    </div>
  );
}

// motion: an easing curve with a leading dot and a couple of fading trail dots
function Motion() {
  return (
    <div className={styles.card}>
      <svg viewBox="0 0 100 60" className={styles.curve} aria-hidden>
        <path d="M6,52 C28,52 34,10 54,10 S84,50 94,14" className={styles.path} pathLength={1} strokeDasharray={1} />
        <circle cx="79" cy="25" r="3" className={styles.head} style={v({ '--o': 0.2 })} />
        <circle cx="87" cy="18.5" r="4" className={styles.head} style={v({ '--o': 0.42 })} />
        <circle cx="94" cy="14" r="5.4" className={styles.head} />
      </svg>
    </div>
  );
}

// default: the blog feed/RSS mark — a dot and two arcs, drawn in
function Feed() {
  return (
    <svg viewBox="0 0 100 100" className={styles.feedMark} aria-hidden>
      <circle cx="26" cy="74" r="9" className={styles.feedDot} />
      <path d="M26,46 A28,28 0 0 1 54,74" className={styles.arc} style={v({ '--i': 1 })} pathLength={1} strokeDasharray={1} />
      <path d="M26,26 A48,48 0 0 1 74,74" className={styles.arc} style={v({ '--i': 2 })} pathLength={1} strokeDasharray={1} />
    </svg>
  );
}

const MOTIFS: Record<MotifKey, () => React.ReactNode> = {
  code: Code,
  audio: Audio,
  writing: Writing,
  reading: Reading,
  process: Process,
  feed: Feed,
  datacenter: Datacenter,
  motion: Motion,
};

export function BlogThumb({ post }: { post: BlogPost }) {
  const motif = pickMotif(post);
  const { ref, revealed } = useReveal();
  const Motif = MOTIFS[motif];
  return (
    <div ref={ref} className={`${styles.root} ${revealed ? styles.inview : ''}`} aria-hidden>
      <Motif />
    </div>
  );
}
