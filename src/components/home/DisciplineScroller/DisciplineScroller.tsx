'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import type { Discipline } from '@/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TechChip } from '@/components/ui/TechChip';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import styles from './DisciplineScroller.module.scss';

const STEP = 232 + 14;
const TOOLS: Record<Discipline, string[]> = {
  code: ['React', 'TypeScript', 'Three.js', 'Sanity', 'Godot'],
  music: ['Logic Pro X', 'Ableton', 'Tape'],
  sound: ['Pro Tools', 'Reaper', 'Field rec.'],
  photo: ['35mm', 'Portra 400', 'Leica M6', 'Lightroom'],
  video: ['Final Cut Pro X', 'DaVinci', 'RED'],
  blog: ['Notes', 'Essays', 'Dev logs'],
};

export function DisciplineScroller() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollByStep = (dir: number) => trackRef.current?.scrollBy({ left: dir * STEP, behavior: 'smooth' });
  return (
    <section className={styles.section} aria-label="Explore by discipline">
      <div className={styles.head}>
        <Eyebrow>Explore by discipline — drag or scroll →</Eyebrow>
        <span className={styles.arrows}>
          <Button variant="icon" aria-label="scroll left" onClick={() => scrollByStep(-1)}>←</Button>
          <Button variant="icon" aria-label="scroll right" onClick={() => scrollByStep(1)}>→</Button>
        </span>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track} ref={trackRef}>
          {DISCIPLINE_ORDER.map((slug) => {
            const d = DISCIPLINES[slug];
            return (
              <Link key={slug} href={d.route} className={styles.cardLink} aria-label={d.route}>
                <GlassCard soft className={styles.card}>
                  <div className={styles.cardHead}>
                    <span className={styles.dot} style={{ background: d.color }} />
                    <span className={styles.slug}>{d.route}</span>
                    <span className={styles.arrow} aria-hidden>↗</span>
                  </div>
                  <div className={styles.tools}>
                    {TOOLS[slug].map((t) => <TechChip key={t} label={t} />)}
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
        <div className={styles.fade} aria-hidden />
      </div>
    </section>
  );
}
