import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import styles from './BlogHero.module.scss';

export function BlogHero({ count }: { count: number }) {
  return (
    <section className={styles.section}>
      <Eyebrow withDot>/blog · {count} posts · {COPY.blog.heroSince}</Eyebrow>
      <div className={styles.grid}>
        <div className={styles.left}>
          <h1 className={styles.heading}>
            Blog<span className={styles.period}>.</span>
          </h1>
          <p className={styles.intro}>
            {COPY.blog.heroIntro}
          </p>
        </div>
        <div className={styles.right} />
      </div>
    </section>
  );
}
