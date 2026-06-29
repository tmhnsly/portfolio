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

// AI's water + energy cost: a droplet falls into a glowing core and sends ripple
// rings out across the field — warm at the centre (the energy), cooling to water
// blue at the edges (where the cost lands)
function Droplet() {
  return (
    <div className={styles.art}>
      <span className={styles.dropletCore} aria-hidden />
      <svg viewBox="0 0 100 100" className={styles.ripples} aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx="50" cy="50" r={6 + i * 9} className={styles.ripple} style={v({ '--i': i })} />
        ))}
      </svg>
      <span className={styles.drop} aria-hidden />
      <span className={styles.grain} aria-hidden />
    </div>
  );
}

// tokens / styling cost: rows of token bars on a warm "editor" field — a dense
// block (verbose, blue) over a sparse one (terse, tomato), the post's own point
// turned into texture. Streams in left-to-right like code being written.
const TOKEN_ROWS: ReadonlyArray<{ count: number; hue: string }> = [
  { count: 8, hue: 'var(--blue-9)' },
  { count: 7, hue: 'var(--blue-9)' },
  { count: 9, hue: 'var(--blue-9)' },
  { count: 6, hue: 'var(--blue-9)' },
  { count: 2, hue: 'var(--tomato-9)' },
  { count: 3, hue: 'var(--tomato-9)' },
];
function Tokens() {
  let order = 0;
  return (
    <div className={styles.art}>
      <div className={styles.tokens} aria-hidden>
        {TOKEN_ROWS.map((row, r) => (
          <div className={styles.tokenRow} key={r}>
            {Array.from({ length: row.count }, (_, i) => (
              <span
                key={i}
                className={styles.token}
                style={v({ '--w': 2 + ((i * 5 + r * 3) % 6), '--i': order++, '--tok': row.hue })}
              />
            ))}
          </div>
        ))}
      </div>
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

// git-graph: the code (tomato) trunk runs straight through as the main day job, with
// audio (blue) and video (green) branches forking off and carrying on to the edge —
// all still active, none merged away, code the line everything else hangs off
const BR_MAIN = 'M-4,30 L104,30';
const BR_AUDIO = 'M16,30 C28,30 30,14 42,14 L104,14';
const BR_VIDEO = 'M40,30 C52,30 54,46 66,46 L104,46';
const COMMITS: ReadonlyArray<{ x: number; y: number; c: string; r: number; i: number }> = [
  { x: 16, y: 30, c: 'var(--tomato-9)', r: 6, i: 3 },
  { x: 40, y: 30, c: 'var(--tomato-9)', r: 6, i: 4 },
  { x: 72, y: 30, c: 'var(--tomato-9)', r: 6, i: 5 },
  { x: 76, y: 14, c: 'var(--blue-9)', r: 5, i: 6 },
  { x: 88, y: 46, c: 'var(--green-9)', r: 5, i: 7 },
];
function Branches() {
  return (
    <div className={styles.art}>
      <svg viewBox="0 0 100 60" className={styles.branches} preserveAspectRatio="none" aria-hidden>
        <path d={BR_AUDIO} className={cx(styles.branch, styles.branchAudio)} style={v({ '--i': 1 })} pathLength={1} strokeDasharray={1} />
        <path d={BR_VIDEO} className={cx(styles.branch, styles.branchVideo)} style={v({ '--i': 2 })} pathLength={1} strokeDasharray={1} />
        <path d={BR_MAIN} className={cx(styles.branch, styles.branchCode)} style={v({ '--i': 0 })} pathLength={1} strokeDasharray={1} />
      </svg>
      {COMMITS.map((d, k) => (
        <span
          key={k}
          className={styles.commit}
          style={v({ left: `${d.x}%`, top: `${(d.y / 60) * 100}%`, '--dot': d.c, '--r': d.r, '--i': d.i })}
          aria-hidden
        />
      ))}
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
  datacenter: Droplet,
  tokens: Tokens,
  branches: Branches,
  feed: Orb,
};

// Each motif picks a Radix hue for its gradient field (orange = code/blog default,
// blue = the water/energy piece, green = reading/process, tomato = motion, sand =
// the warm neutral "editor" field behind the tokens). The droplet + tokens motifs
// layer a second hue inside the form, so they read as more than one colour.
const MOTIF_HUE: Partial<Record<MotifKey, 'hueBlue' | 'hueGreen' | 'hueTomato' | 'hueSand'>> = {
  datacenter: 'hueBlue',
  audio: 'hueBlue',
  reading: 'hueGreen',
  process: 'hueGreen',
  motion: 'hueTomato',
  tokens: 'hueSand',
  branches: 'hueSand',
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
