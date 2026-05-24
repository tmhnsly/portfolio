import { Eyebrow } from '@/components/ui/Eyebrow';
import styles from './Intro.module.scss';

export function Intro() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Eyebrow>Currently</Eyebrow>
          <p className={styles.headline}>
            Frontend Engineer at <span className={styles.accent}>a research lab</span>.
          </p>
          <p className={styles.note}>
            Mostly building research interfaces.<br />
            Working on side things in the evenings.
          </p>
        </div>
        <div className={styles.right}>
          <p className={styles.body}>
            I&rsquo;ve been building things on the web since 2018 — first as a
            designer, then increasingly as an engineer. My day job is shipping
            production interfaces; the rest of my time goes into smaller, weirder
            projects that mix code with sound, image and writing.
          </p>
          <p className={styles.body}>
            Most of what&rsquo;s here is self-initiated. If something looks like the
            sort of thing you&rsquo;d like to commission, send me a note.
          </p>
        </div>
      </div>
    </section>
  );
}
