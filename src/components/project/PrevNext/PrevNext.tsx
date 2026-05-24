import Link from 'next/link';
import type { Project } from '@/types';
import type { Discipline } from '@/types';
import styles from './PrevNext.module.scss';

interface PrevNextProps {
  discipline: Discipline;
  prev?: Project;
  next?: Project;
}

export function PrevNext({ discipline, prev, next }: PrevNextProps) {
  return (
    <nav className={styles.prevNext} aria-label="Project navigation">
      <div className={styles.card}>
        {prev ? (
          <Link href={`/${discipline}/${prev.slug}`} className={styles.link}>
            <span className={styles.dir}>← Previous in /{discipline}</span>
            <span className={styles.projectTitle}>{prev.title}</span>
          </Link>
        ) : (
          <div className={`${styles.link} ${styles.disabled}`}>
            <span className={styles.dir}>← Previous in /{discipline}</span>
            <span className={styles.projectTitle}>—</span>
          </div>
        )}
      </div>

      <div className={styles.card}>
        {next ? (
          <Link href={`/${discipline}/${next.slug}`} className={`${styles.link} ${styles.right}`}>
            <span className={styles.dir}>Next in /{discipline} →</span>
            <span className={styles.projectTitle}>{next.title}</span>
          </Link>
        ) : (
          <div className={`${styles.link} ${styles.right} ${styles.disabled}`}>
            <span className={styles.dir}>Next in /{discipline} →</span>
            <span className={styles.projectTitle}>—</span>
          </div>
        )}
      </div>
    </nav>
  );
}
