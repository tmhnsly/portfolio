import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { ThemeProvider, THEME_SCRIPT } from '@/lib/theme';
import { Shell } from '@/components/layout/Shell';
import { JsonLd } from '@/components/seo';
import { breadcrumbData } from '@/lib/content';
import { identityGraphJsonLd } from '@/lib/structured-data';
import { COPY } from '@/data';
import { SITE_URL } from '@/lib/site-url';
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
import '@radix-ui/colors/blue.css';
import '@radix-ui/colors/blue-dark.css';
import '@radix-ui/colors/orange.css';
import '@radix-ui/colors/orange-dark.css';
import '@radix-ui/colors/white-alpha.css';
import '@radix-ui/colors/black-alpha.css';
import './globals.scss';

// `swap`: a metric-matched fallback shows immediately (no invisible text) and
// Space Grotesk swaps in once loaded. `optional` was dropping the font for the
// whole session on a slow cold load (the "font occasionally drops out on
// refresh"); next/font's size-adjusted fallback keeps the swap from shifting layout.
const display = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-space-grotesk', display: 'swap' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: COPY.meta.title, template: '%s · Tom Hinsley' },
  description: COPY.meta.description,
  alternates: { canonical: '/', types: { 'application/rss+xml': '/feed.xml' } },
  openGraph: {
    type: 'website',
    siteName: 'Tom Hinsley',
    locale: 'en_GB',
    url: '/',
    title: COPY.meta.title,
    description: COPY.meta.description,
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Data for the persistent breadcrumb in the Shell — sourced from the content
  // query module (per-discipline counts, leaf path→title map, post count).
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <JsonLd data={identityGraphJsonLd()} />
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
