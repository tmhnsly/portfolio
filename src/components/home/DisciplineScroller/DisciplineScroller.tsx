import Link from 'next/link';
import { DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import { COPY } from '@/data';
import { topTagsByDiscipline } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LinkArrow } from '@/components/ui/LinkArrow';
import styles from './DisciplineScroller.module.scss';

export function DisciplineScroller() {
  return (
    <section className={styles.section} aria-label={COPY.home.exploreByDiscipline}>
      <div className={styles.head}>
        <Eyebrow>{COPY.home.exploreByDiscipline}</Eyebrow>
      </div>
      <ul className={styles.list}>
        {DISCIPLINE_ORDER.map((slug) => {
          const d = DISCIPLINES[slug];
          return (
            <li key={slug}>
              <Link href={d.route} className={styles.row} aria-label={d.route}>
                <span className={styles.route}>
                  <span className={styles.dot} style={{ background: d.color }} />
                  {d.route}
                </span>
                <span className={styles.tools}>{topTagsByDiscipline(slug, 5).join(' · ')}</span>
                <LinkArrow className={styles.arrow} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
