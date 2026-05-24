import { Eyebrow } from '@/components/ui/Eyebrow';
import { Media } from '@/components/ui/Media';
import { TechChip } from '@/components/ui/TechChip';
import styles from './AboutHero.module.scss';

const CHIPS = ['Frontend', '3D', 'Generative', 'Music', 'Sound design', 'Photography', 'Video', 'Writing'];

export function AboutHero() {
  return (
    <section className={styles.section}>
      <Eyebrow withDot>About · Tom Hinsley · London 51.5°N</Eyebrow>
      <div className={styles.grid}>
        <div className={styles.portrait}>
          <Media
            src="/images/about/portrait.jpg"
            grad="linear-gradient(160deg,#dd4a2e,#5e1c14)"
            alt="Tom Hinsley — portrait"
            ratio="4/5"
            sizes="(min-width:768px) 360px, 90vw"
            rounded
          />
        </div>
        <div className={styles.copy}>
          <h1 className={styles.name}>
            Tom Hinsley<span className={styles.dot}>.</span>
          </h1>
          <p className={styles.intro}>
            Trained as a designer, now a frontend engineer in London —
            with side practices in music, sound, photo, video and writing.
          </p>
          <div className={styles.chips}>
            {CHIPS.map((c) => (
              <TechChip key={c} label={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
