import Link from 'next/link';
import { COPY } from '@/data';
import { DISCIPLINES } from '@/lib/disciplines';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PixelMark } from '@/components/ui/PixelMark';
import { LinkArrow } from '@/components/ui/LinkArrow';
import styles from './Help.module.scss';

/**
 * "How I can help" — one discipline-accented glass card per hireable practice,
 * each taking that discipline's accent + pixel mark and linking into its work.
 * Moved onto the About page from the retired /hire landing page.
 */
export function Help() {
  const { helpEyebrow, helpHeading, help } = COPY.about;
  return (
    <section className={styles.section} aria-labelledby="help-heading">
      <div className={styles.head}>
        <Eyebrow>{helpEyebrow}</Eyebrow>
        <h2 id="help-heading" className={styles.heading}>
          {helpHeading}<span className={styles.period}>.</span>
        </h2>
      </div>
      <div className={styles.grid}>
        {help.map((s) => {
          const d = DISCIPLINES[s.discipline];
          return (
            <Link
              key={s.discipline}
              href={d.route}
              className={styles.card}
              style={{ ['--accent']: d.color, ['--accent-ink']: d.ink } as React.CSSProperties}
              aria-label={`${s.title}: ${s.linkLabel}`}
            >
              <span className={styles.cardBar} aria-hidden />
              <span className={styles.mark}>
                <PixelMark icon={s.discipline} accent="var(--accent)" color="var(--text-soft)" size={48} />
              </span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardBody}>{s.body}</p>
              <span className={styles.cardLink}>{s.linkLabel} <LinkArrow inline /></span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
