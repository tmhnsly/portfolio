'use client';
/**
 * BlogThumb — the cover a post draws when it ships no image. Picks a motif from the
 * post's content (see pickMotif) and renders it as a small piece of atmospheric
 * cover art: a warm gradient field with one luminous abstract form that evokes the
 * topic — a fading pixel field (code/structure), a glowing core throwing ripple
 * rings (AI's energy/water cost), flowing waves (motion), a rising orb (a first
 * post). Pure CSS/SVG, container-query sized, gated on useReveal so the entrance
 * plays once. Reduced motion shows the finished frame (base CSS is the final state).
 */
import type { BlogPost } from '@/lib/schemas';
import { useReveal } from '@/components/project-thumbs/useReveal';
import { cx } from '@/lib/cx';
import { pickMotif, type MotifKey } from './pickMotif';
import styles from './BlogThumb.module.scss';

type Vars = React.CSSProperties & Record<string, string | number>;
const v = (o: Record<string, string | number>) => o as Vars;

// code / structure: a tilted field of pixels dissolving into the light — the
// brand's dot language, abstracted
function DotField() {
  return (
    <div className={styles.art}>
      <span className={styles.dotgrid} aria-hidden />
      <span className={styles.grain} aria-hidden />
    </div>
  );
}

// AI's energy + water cost: a glowing core sending out ripple rings
function Rings() {
  return (
    <div className={styles.art}>
      <span className={styles.coreGlow} aria-hidden />
      <svg viewBox="0 0 100 100" className={styles.rings} aria-hidden>
        <circle cx="50" cy="50" r="8" className={styles.core} />
        {[1, 2, 3, 4].map((i) => (
          <circle key={i} cx="50" cy="50" r={8 + i * 11} className={styles.ring} style={v({ '--i': i })} />
        ))}
      </svg>
      <span className={styles.grain} aria-hidden />
    </div>
  );
}

const WAVE = 'M-2,30 C16,12 32,12 50,30 C66,46 82,48 102,28';
// motion: layered flowing waves
function Waves() {
  return (
    <div className={styles.art}>
      <svg viewBox="0 0 100 60" className={styles.waves} preserveAspectRatio="none" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={WAVE} className={styles.wave} style={v({ '--i': i })} pathLength={1} strokeDasharray={1} />
        ))}
      </svg>
      <span className={styles.grain} aria-hidden />
    </div>
  );
}

// a first post / a signal put out: a glowing orb rising with faint halos
function Orb() {
  return (
    <div className={styles.art}>
      <span className={styles.halo} style={v({ '--i': 2 })} aria-hidden />
      <span className={styles.halo} style={v({ '--i': 1 })} aria-hidden />
      <span className={styles.orb} aria-hidden />
      <span className={styles.grain} aria-hidden />
    </div>
  );
}

const MOTIFS: Record<MotifKey, () => React.ReactNode> = {
  code: DotField,
  writing: DotField,
  reading: DotField,
  audio: Waves,
  motion: Waves,
  process: Rings,
  datacenter: Rings,
  feed: Orb,
};

// Each motif picks a Radix hue that fits its subject (orange = code/blog default,
// blue = the water/energy piece, green = reading/process, tomato = motion).
const MOTIF_HUE: Partial<Record<MotifKey, 'hueBlue' | 'hueGreen' | 'hueTomato'>> = {
  datacenter: 'hueBlue',
  audio: 'hueBlue',
  reading: 'hueGreen',
  process: 'hueGreen',
  motion: 'hueTomato',
};

export function BlogThumb({ post }: { post: BlogPost }) {
  const motif = pickMotif(post);
  const Motif = MOTIFS[motif];
  const hue = MOTIF_HUE[motif];
  const { ref, revealed } = useReveal();
  return (
    <div
      ref={ref}
      className={cx(styles.root, hue && styles[hue], revealed && styles.inview)}
      aria-hidden
    >
      <Motif />
    </div>
  );
}
