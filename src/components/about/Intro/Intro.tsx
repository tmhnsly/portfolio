import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import styles from './Intro.module.scss';

export function Intro() {
  const [noteLine1, noteLine2] = COPY.about.currentlyNote.split('\n');
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Eyebrow>{COPY.about.currentlyEyebrow}</Eyebrow>
          <p className={styles.headline}>
            {COPY.about.currentlyLead}<span className={styles.accent}>{COPY.about.currentlyAccent}</span>.
          </p>
          <p className={styles.note}>
            {noteLine1}<br />
            {noteLine2}
          </p>
        </div>
        <div className={styles.right}>
          <p className={styles.body}>{COPY.about.bodyPara1}</p>
          <p className={styles.body}>{COPY.about.bodyPara2}</p>
        </div>
      </div>
    </section>
  );
}
