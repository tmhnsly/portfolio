'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { Project } from '@/types';
import { SITE, COPY } from '@/data';
import { entranceStagger, entranceItem } from '@/lib/motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CardDeck } from '../CardDeck';
import styles from './Hero.module.scss';

export function Hero({ featured }: { featured: Project[] }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className={styles.hero}>
        <div className={styles.lead}>
          <Eyebrow withDot>{SITE.name} · {SITE.location}</Eyebrow>
          <h1 className={styles.title}>
            {COPY.hero.titleLead}<br />
            <span className={styles.muted}>{COPY.hero.titleMuted}</span><span className={styles.period}>.</span>
          </h1>
          <p className={styles.sub}>
            {COPY.hero.sub}
          </p>
        </div>
        <div className={styles.deckCol}>
          <Eyebrow>Featured deck</Eyebrow>
          <CardDeck items={featured} />
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className={styles.hero}
      variants={entranceStagger}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.lead}>
        <motion.div variants={entranceItem}>
          <Eyebrow withDot>{SITE.name} · {SITE.location}</Eyebrow>
        </motion.div>
        <motion.div variants={entranceItem}>
          <h1 className={styles.title}>
            {COPY.hero.titleLead}<br />
            <span className={styles.muted}>{COPY.hero.titleMuted}</span><span className={styles.period}>.</span>
          </h1>
        </motion.div>
        <motion.div variants={entranceItem}>
          <p className={styles.sub}>
            {COPY.hero.sub}
          </p>
        </motion.div>
      </div>
      <motion.div className={styles.deckCol} variants={entranceItem}>
        <Eyebrow>Featured deck</Eyebrow>
        <CardDeck items={featured} />
      </motion.div>
    </motion.section>
  );
}
