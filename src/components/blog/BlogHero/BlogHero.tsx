import { Eyebrow } from '@/components/ui/Eyebrow';
import styles from './BlogHero.module.scss';

export function BlogHero({ count }: { count: number }) {
  return (
    <section className={styles.section}>
      <Eyebrow withDot>/blog · {count} posts · since 2024</Eyebrow>
      <div className={styles.grid}>
        <div className={styles.left}>
          <h1 className={styles.heading}>
            Blog<span className={styles.period}>.</span>
          </h1>
          <p className={styles.intro}>
            Notes, essays and dev logs. Mostly about whatever I&rsquo;m currently
            chewing on — usually code, sometimes sound, occasionally a book.
          </p>
        </div>
        <div className={styles.right} />
      </div>
    </section>
  );
}
