// Pixel brand-mark icon set — ported from the design handoff (pixel-icons.jsx);
// bitmaps and reveal orders preserved exactly. Each icon is a 16×16 grid:
//   '#' = ink pixel (currentColor)  '*' = accent pixel (per-route accent)  '.' = empty
// To add/edit: copy a block, draw 16 rows of 16 chars, pick an `order`. The
// component picks it up via the cell-union automatically — nothing else changes.

export const GRID = 16;

const Im = (...rows: string[]): number[][] => {
  if (rows.length !== GRID) throw new Error(`icon needs ${GRID} rows, got ${rows.length}`);
  return rows.map((row) => {
    if (row.length !== GRID) throw new Error(`row "${row}" must be ${GRID} chars`);
    return [...row].map((ch) => (ch === '#' ? 1 : ch === '*' ? 2 : 0));
  });
};

export type IconOrder =
  | 'topDown' | 'bottomUp' | 'leftRight' | 'rightLeft'
  | 'outsideIn' | 'centerOut' | 'diagonal' | 'radialOut';

// reveal-order functions — return 0..1 per cell to stagger the dissolve
export const ORDERS: Record<IconOrder, (r: number, c: number) => number> = {
  topDown: (r) => r / 15,
  bottomUp: (r) => (15 - r) / 15,
  leftRight: (_r, c) => c / 15,
  rightLeft: (_r, c) => (15 - c) / 15,
  outsideIn: (r, c) => 1 - Math.max(Math.abs(r - 7.5), Math.abs(c - 7.5)) / 7.5,
  centerOut: (r, c) => Math.max(Math.abs(r - 7.5), Math.abs(c - 7.5)) / 7.5,
  diagonal: (r, c) => (r + c) / 30,
  radialOut: (r, c) => Math.hypot(r - 7.5, c - 7.5) / 10.6,
};

export const ICON_KEYS = ['home', 'code', 'audio', 'video', 'blog', 'about'] as const;
export type IconKey = (typeof ICON_KEYS)[number];

export interface PixelIcon {
  label: string;
  order: IconOrder;
  data: number[][];
}

export const ICONS: Record<IconKey, PixelIcon> = {
  home: { label: 'Home', order: 'topDown', data: Im(
    '................',
    '................',
    '..........##....',
    '.......##.##....',
    '......######....',
    '.....######.....',
    '....########....',
    '...##########...',
    '..############..',
    '...##########...',
    '...###****###...',
    '...###****###...',
    '...###****###...',
    '...###****###...',
    '................',
    '................') },

  code: { label: 'Code', order: 'leftRight', data: Im(
    '................',
    '................',
    '................',
    '....##..........',
    '.....##.........',
    '......##........',
    '.......##.......',
    '........##......',
    '.......##.......',
    '......##........',
    '.....##.........',
    '....##...****...',
    '.........****...',
    '................',
    '................',
    '................') },

  audio: { label: 'Audio', order: 'leftRight', data: Im(
    '................',
    '................',
    '................',
    '...........##...',
    '.....##....###..',
    '.....##....#....',
    '.....##.##.#....',
    '.....##.##.#....',
    '..##.##.##.#....',
    '..##.##.##.#....',
    '..##.##.#***....',
    '..##.##.*****...',
    '..##.##.*****...',
    '.........***....',
    '................',
    '................') },

  video: { label: 'Video', order: 'outsideIn', data: Im(
    '................',
    '................',
    '..##.##.##.##...',
    '...##.##.##.##..',
    '..############..',
    '..############..',
    '..############..',
    '..##********##..',
    '..##********##..',
    '..##********##..',
    '..##********##..',
    '..##********##..',
    '..############..',
    '..############..',
    '................',
    '................') },

  blog: { label: 'Blog', order: 'topDown', data: Im(
    '................',
    '................',
    '................',
    '....###.........',
    '....#####.......',
    '.......####.....',
    '.........###....',
    '....###...##....',
    '....####...##...',
    '......###..##...',
    '.......###..##..',
    '...***..##..##..',
    '...***..##..##..',
    '...***..........',
    '................',
    '................') },

  about: { label: 'About', order: 'topDown', data: Im(
    '................',
    '................',
    '.......##.......',
    '......####......',
    '.....######.....',
    '.....######.....',
    '......####......',
    '.......##.......',
    '................',
    '...##########...',
    '..############..',
    '..#####**#####..',
    '..#####**#####..',
    '..############..',
    '................',
    '................') },
};

/** Narrow an arbitrary route segment to a known icon key (else caller falls back). */
export function isIconKey(s: string | undefined | null): s is IconKey {
  return s != null && (ICON_KEYS as readonly string[]).includes(s);
}
