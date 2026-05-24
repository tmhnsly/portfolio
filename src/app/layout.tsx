import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { ThemeProvider, THEME_SCRIPT } from '@/lib/theme';
import { Shell } from '@/components/layout/Shell';
import { getAllProjects } from '@/lib/content';
import type { Discipline } from '@/types';
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
import '@radix-ui/colors/white-alpha.css';
import '@radix-ui/colors/black-alpha.css';
import './globals.scss';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-space-grotesk', display: 'swap' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono', display: 'swap' });

export const metadata: Metadata = {
  title: COPY.meta.title,
  description: COPY.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // project counts per discipline — handed to the persistent section eyebrow in the Shell
  const projectCounts: Partial<Record<Discipline, number>> = {};
  for (const p of getAllProjects()) projectCounts[p.discipline] = (projectCounts[p.discipline] ?? 0) + 1;
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <Shell projectCounts={projectCounts}>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
