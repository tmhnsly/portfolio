'use client';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import type { Discipline } from '@/types';
import { isDiscipline } from '@/lib/disciplines';
import { DURATION, EASING } from '@/lib/motion';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Roll } from '@/components/motion/Roll';
import styles from './SectionEyebrow.module.scss';

/**
 * Persistent discipline-hub eyebrow. Lives in app/[discipline]/layout.tsx so it
 * survives hub→hub navigation; the slug flips and the count rolls in place (the
 * bar stays put). Renders nothing on project pages. Travel direction follows the
 * discipline order, so the slug + count roll the same way.
 */
export function SectionEyebrow({ counts }: { counts: Partial<Record<Discipline, number>> }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const segs = pathname.split('/').filter(Boolean);
  const seg = segs[0] ?? '';
  const discipline: Discipline | null = segs.length === 1 && isDiscipline(seg) ? seg : null;

  if (!discipline) return null;
  const count = counts[discipline] ?? 0;

  const inner = (
    <Eyebrow withDot>
      Section · <Roll value={`/${discipline}`} /> · <Roll value={count} /> project{count === 1 ? '' : 's'}
    </Eyebrow>
  );

  return (
    <Container>
      {reduce ? (
        <div className={styles.bar}>{inner}</div>
      ) : (
        <motion.div
          className={styles.bar}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.reveal, ease: EASING.standard }}
        >
          {inner}
        </motion.div>
      )}
    </Container>
  );
}
