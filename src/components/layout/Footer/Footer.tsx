import { SITE } from '@/data';
import { Marquee } from '@/components/motion/Marquee';
import { Container } from '../Container';
import styles from './Footer.module.scss';

const MARQUEE_ITEMS = ['Tom Hinsley', SITE.email, 'London 51.5°N', 'Get in touch'];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.rules}>
          <Marquee>
            <span className={styles.row}>
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} className={styles.item}>
                  {item}
                  <span className={styles.dot} aria-hidden>●</span>
                </span>
              ))}
            </span>
          </Marquee>
        </div>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.label}>Tom Hinsley</div>
            <p>A digital creative based in London. Frontend engineer with side practices in music, sound, photo, video &amp; blog.</p>
          </div>
          <div className={styles.col}>
            <div className={styles.label}>Sections</div>
            {SITE.nav.filter((n) => n.label !== 'About').map((n) => <div key={n.href}>{n.label}</div>)}
          </div>
          <div className={styles.col}>
            <div className={styles.label}>Elsewhere</div>
            {SITE.socials.map((s) => <div key={s.label}>{s.label}</div>)}
          </div>
          <div className={styles.col}>
            <div className={styles.label}>Colophon</div>
            <p>{SITE.colophon}</p>
          </div>
          <div className={`${styles.col} ${styles.right}`}>
            <div className={styles.label}>© 2026</div>
            <div>v1.0</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
