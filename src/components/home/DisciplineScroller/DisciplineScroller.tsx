import { DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import { COPY } from '@/data';
import { topTagsByDiscipline } from '@/lib/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DisciplineCard } from '@/components/ui/DisciplineCard';
import styles from './DisciplineScroller.module.scss';

export function DisciplineScroller() {
  return (
    <section className={styles.section} aria-label={COPY.home.exploreByDiscipline}>
      <div className={styles.head}>
        <Eyebrow>{COPY.home.exploreByDiscipline}</Eyebrow>
      </div>
      <div className={styles.track}>
        {DISCIPLINE_ORDER.map((slug) => (
          <DisciplineCard
            key={slug}
            discipline={slug}
            tools={topTagsByDiscipline(slug, 5)}
            href={DISCIPLINES[slug].route}
            showArrow
            maxTools={5}
          />
        ))}
      </div>
    </section>
  );
}
