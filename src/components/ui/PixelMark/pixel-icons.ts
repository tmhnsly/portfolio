// Pixel brand-mark icon set — bitmaps ported from the design handoff exactly.
// Each icon is a 16×16 grid:
//   '#' = ink pixel (currentColor)  '*' = accent pixel (per-route accent)  '.' = empty
// To add/edit: copy a block, draw 16 rows of 16 chars. The component picks it up
// via the cell-union automatically — nothing else changes.
// (The handoff's per-icon `order` field is dropped: PixelMark now uses one uniform
//  diagonal sweep for every glyph — see PixelMark.tsx.)

export const GRID = 16;

const Im = (...rows: string[]): number[][] => {
  if (rows.length !== GRID) throw new Error(`icon needs ${GRID} rows, got ${rows.length}`);
  return rows.map((row) => {
    if (row.length !== GRID) throw new Error(`row "${row}" must be ${GRID} chars`);
    return [...row].map((ch) => (ch === '#' ? 1 : ch === '*' ? 2 : 0));
  });
};

export const ICON_KEYS = ['home', 'code', 'audio', 'video', 'blog', 'about'] as const;
export type IconKey = (typeof ICON_KEYS)[number];

export interface PixelIcon {
  label: string;
  data: number[][];
}

export const ICONS: Record<IconKey, PixelIcon> = {
  home: { label: 'Home', data: Im(
    '................',
    '................',
    '.......##.......',
    '......####.##...',
    '.....########...',
    '....########....',
    '...##########...',
    '..############..',
    '...##########...',
    '...###****###...',
    '...###****###...',
    '...###****###...',
    '...###****###...',
    '...##########...',
    '................',
    '................') },

  code: { label: 'Code', data: Im(
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

  audio: { label: 'Audio', data: Im(
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

  video: { label: 'Video', data: Im(
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

  blog: { label: 'Blog', data: Im(
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

  about: { label: 'About', data: Im(
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
