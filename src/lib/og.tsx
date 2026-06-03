import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { tomato, blue, green, orange } from '@radix-ui/colors';
import type { Discipline } from '@/types';

// Shared renderer for the per-page Open Graph cards (1200×630). satori can't read
// the CSS vars the app themes with, so the cards use fixed Radix light hexes.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

type Accent = { from: string; to: string };
const ACCENT: Record<Discipline, Accent> = {
  code: { from: tomato.tomato8, to: tomato.tomato11 },
  audio: { from: blue.blue8, to: blue.blue11 },
  video: { from: green.green8, to: green.green11 },
  blog: { from: orange.orange8, to: orange.orange11 },
};
export const ogAccent = (d: Discipline): Accent => ACCENT[d];

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

export async function ogImage({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: Accent }) {
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
          background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
          color: '#ffffff',
          fontFamily: 'Space Grotesk',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: 0.92 }}>
          <div style={{ width: 16, height: 16, borderRadius: 16, background: '#ffffff' }} />
          <span style={{ fontSize: 30, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase' }}>{eyebrow}</span>
        </div>
        <div style={{ display: 'flex', maxWidth: 1000 }}>
          <span style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2.5 }}>{title}.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30 }}>
          <span style={{ fontWeight: 700 }}>Tom Hinsley</span>
          <span style={{ fontWeight: 500, opacity: 0.6 }}>tomhinsley.com</span>
        </div>
      </div>
    ),
    { width: OG_SIZE.width, height: OG_SIZE.height, fonts: await ogFonts() },
  );
}
