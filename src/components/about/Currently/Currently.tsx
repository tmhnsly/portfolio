import type { IconType } from 'react-icons';
import { BiBook, BiTv, BiJoystick } from 'react-icons/bi';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import styles from './Currently.module.scss';

/** One boxicon per media kind (book / TV / game). */
const ICONS: Record<string, IconType> = {
  book: BiBook,
  tv: BiTv,
  game: BiJoystick,
};

/**
 * "Off the clock" — a compact row of what Tom is currently reading / watching /
 * playing, each with an icon. Titles + optional out-links live in
 * COPY.about.offTheClock (editable). Sits between Intro and Timeline.
 */
export function Currently() {
  return (
    <section className={styles.section}>
      <Eyebrow>{COPY.about.offTheClockEyebrow}</Eyebrow>
      <ul className={styles.grid}>
        {COPY.about.offTheClock.map((item) => {
          const Icon = ICONS[item.kind];
          return (
            <li key={item.kind} className={styles.item}>
              <span className={styles.icon} aria-hidden>{Icon && <Icon />}</span>
              <span className={styles.text}>
                <span className={styles.label}>{item.label}</span>
                {item.href ? (
                  <a className={styles.title} href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                ) : (
                  <span className={styles.title}>{item.title}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
