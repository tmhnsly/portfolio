import type { Project } from '@/types';
import { SITE, COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CardDeck } from '../CardDeck';
import styles from './Hero.module.scss';

export function Hero({ featured }: { featured: Project[] }) {
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
