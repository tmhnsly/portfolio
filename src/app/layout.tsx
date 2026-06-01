import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { ThemeProvider, THEME_SCRIPT } from '@/lib/theme';
import { Shell } from '@/components/layout/Shell';
import { breadcrumbData } from '@/lib/content';
import { COPY } from '@/data';
import '@radix-ui/colors/sand.css';
import '@radix-ui/colors/sand-dark.css';
import '@radix-ui/colors/sand-alpha.css';
import '@radix-ui/colors/sand-dark-alpha.css';
import '@radix-ui/colors/gray.css';
import '@radix-ui/colors/gray-dark.css';
import '@radix-ui/colors/tomato.css';
import '@radix-ui/colors/tomato-dark.css';
import '@radix-ui/colors/tomato-alpha.css';
import '@radix-ui/colors/tomato-dark-alpha.css';
/* discipline hue scales (light + dark) — each discipline maps to one in
   src/lib/disciplines.ts; add a scale here to make a new hue available to swap to. */
import '@radix-ui/colors/green.css';
import '@radix-ui/colors/green-dark.css';
import '@radix-ui/colors/teal.css';
import '@radix-ui/colors/teal-dark.css';
import '@radix-ui/colors/blue.css';
import '@radix-ui/colors/blue-dark.css';
import '@radix-ui/colors/yellow.css';
import '@radix-ui/colors/yellow-dark.css';
import '@radix-ui/colors/orange.css';
import '@radix-ui/colors/orange-dark.css';
import '@radix-ui/colors/white-alpha.css';
import '@radix-ui/colors/black-alpha.css';
import './globals.scss';

// `optional` (not `swap`): the font is preloaded, so it's normally used on first
// paint — but if it's slow on a cold load, the browser keeps the metric-matched
// fallback for that session rather than swapping the font in mid-animation, which
// reflowed the hero title's word-by-word reveal on iOS (the initial-load glitch).
const display = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-space-grotesk', display: 'optional' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono', display: 'swap' });

export const metadata: Metadata = {
  title: COPY.meta.title,
  description: COPY.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Data for the persistent breadcrumb in the Shell — sourced from the content
  // query module (per-discipline counts, leaf path→title map, post count).
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <Shell breadcrumbData={breadcrumbData()}>
            {children}
          </Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
