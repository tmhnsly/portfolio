import type { Project } from '@/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CardDeck } from '../CardDeck';
import styles from './Hero.module.scss';

export function Hero({ featured }: { featured: Project[] }) {
  return (
    <section className={styles.hero}>
      <div className={styles.lead}>
        <Eyebrow withDot>Tom Hinsley · London</Eyebrow>
        <h1 className={styles.title}>
          Tom Hinsley,<br />
          <span className={styles.muted}>digital creative</span><span className={styles.period}>.</span>
        </h1>
        <p className={styles.sub}>
          Frontend engineer based in London. Side practices in music, sound, photography and film.
        </p>
      </div>
      <div className={styles.deckCol}>
        <Eyebrow>Featured deck</Eyebrow>
        <CardDeck items={featured} />
      </div>
    </section>
  );
}
