import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { tomato, blue, green, orange, sand } from '@radix-ui/colors';
import type { Discipline } from '@/types';

// Shared renderer for the per-page Open Graph cards (1200×630). satori can't read
// the CSS vars the app themes with, so the cards rebuild the site's light look from
// fixed Radix hexes: warm sand paper, a soft accent bloom, the pixel monogram in the
// discipline colour, a dark display title with the accent period, and a name footer.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// Per-discipline palette, mirroring lib/disciplines: solid = step-9 (monogram tile),
// ink = step-11 (the accent period + eyebrow dot), bloom = step-5 (the soft glow).
type Palette = { solid: string; ink: string; bloom: string };
const PALETTE: Record<Discipline, Palette> = {
  code: { solid: tomato.tomato9, ink: tomato.tomato11, bloom: tomato.tomato5 },
  audio: { solid: blue.blue9, ink: blue.blue11, bloom: blue.blue5 },
  video: { solid: green.green9, ink: green.green11, bloom: green.green5 },
  blog: { solid: orange.orange9, ink: orange.orange11, bloom: orange.orange5 },
};
export const ogAccent = (d: Discipline): Palette => PALETTE[d];

// The `>_` prompt glyph from the favicon (src/app/icon.svg), rebuilt as a data URI so
// the tile can take any discipline colour. Cells are 16px on a 256 grid.
const CHEVRON: [number, number][] = [
  [64, 48], [80, 48], [80, 64], [96, 64], [96, 80], [112, 80], [112, 96], [128, 96],
  [128, 112], [144, 112], [112, 128], [128, 128], [96, 144], [112, 144], [80, 160],
  [96, 160], [64, 176], [80, 176],
];
const CURSOR: [number, number][] = [
  [144, 176], [160, 176], [176, 176], [192, 176], [144, 192], [160, 192], [176, 192], [192, 192],
];
function monogram(tile: string) {
  const cell = (x: number, y: number, fill: string) =>
    `<rect x="${x}" y="${y}" width="16" height="16" rx="2" fill="${fill}"/>`;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">` +
    `<rect width="256" height="256" rx="56" fill="${tile}"/>` +
    CHEVRON.map(([x, y]) => cell(x, y, '#ffffff')).join('') +
    CURSOR.map(([x, y]) => cell(x, y, 'rgba(255,255,255,0.72)')).join('') +
    `</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// satori needs ttf/otf/woff (NOT woff2); the two weights are bundled in public/fonts.
let fontCache: { name: string; data: Buffer; weight: 500 | 700; style: 'normal' }[] | null = null;
async function ogFonts() {
  if (!fontCache) {
    const dir = path.join(process.cwd(), 'public/fonts');
    const [medium, bold] = await Promise.all([
      readFile(path.join(dir, 'space-grotesk-500.woff')),
      readFile(path.join(dir, 'space-grotesk-700.woff')),
    ]);
    fontCache = [
      { name: 'Space Grotesk', data: medium, weight: 500, style: 'normal' },
      { name: 'Space Grotesk', data: bold, weight: 700, style: 'normal' },
    ];
  }
  return fontCache;
}

export async function ogImage({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: Palette }) {
  // Long blog/project titles need a smaller size to stay on the card.
  const titleSize = title.length > 42 ? 60 : title.length > 26 ? 76 : 94;
  // Render word-by-word so the title wraps, but keep the last word + accent period
  // glued together (their own nowrap group) so the period hugs the end of the copy
  // instead of orphaning onto its own line.
  const words = title.split(' ');
  const lastWord = words[words.length - 1] ?? title;
  const leadWords = words.slice(0, -1);
  const wordGap = Math.round(titleSize * 0.25);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 84,
          backgroundColor: sand.sand1,
          // soft accent bloom in the top-right corner, fading to paper — the site's Bloom
          backgroundImage: `radial-gradient(70% 95% at 100% 0%, ${accent.bloom}, ${sand.sand1} 62%)`,
          fontFamily: 'Space Grotesk',
        }}
      >
        {/* brand mark */}
        <div style={{ display: 'flex' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- satori renders to a static PNG */}
          <img src={monogram(accent.solid)} width={92} height={92} alt="" />
        </div>

        {/* eyebrow + title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 13, height: 13, borderRadius: 13, backgroundColor: accent.ink }} />
            <span style={{ fontSize: 27, fontWeight: 500, letterSpacing: 4, textTransform: 'uppercase', color: sand.sand11 }}>
              {eyebrow}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              maxWidth: 1010,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.03,
              letterSpacing: -2,
              color: sand.sand12,
            }}
          >
            {leadWords.map((w, i) => (
              <span key={i} style={{ marginRight: wordGap }}>
                {w}
              </span>
            ))}
            <span style={{ display: 'flex', alignItems: 'baseline' }}>
              <span>{lastWord}</span>
              <span style={{ color: accent.ink }}>.</span>
            </span>
          </div>
        </div>

        {/* footer */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', width: '100%', height: 1, backgroundColor: sand.sand6, marginBottom: 28 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: sand.sand12 }}>Tom Hinsley</span>
            <span style={{ fontSize: 28, fontWeight: 500, color: sand.sand11 }}>tomhinsley.com</span>
          </div>
        </div>
      </div>
    ),
    { width: OG_SIZE.width, height: OG_SIZE.height, fonts: await ogFonts() },
  );
}
