import Link from 'next/link';
import { SITE } from '@/data';
import { Marquee } from '@/components/motion/Marquee';
import { Container } from '../Container';
import { FullBleed } from '../FullBleed';
import styles from './Footer.module.scss';

const MARQUEE_ITEMS = ['Tom Hinsley', SITE.email, 'London 51.5°N', 'Get in touch'];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <FullBleed>
        <div className={styles.rules}>
          <Marquee faded>
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
      </FullBleed>
      <Container>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.label}>Tom Hinsley</div>
            <p>A digital creative based in London. Frontend engineer with side practices in music, sound, photo, video &amp; blog.</p>
          </div>
          <div className={styles.col}>
            <div className={styles.label}>Sections</div>
            {SITE.nav.filter((n) => n.label !== 'About').map((n) => <Link className={styles.link} href={n.href} key={n.href}>{n.label}</Link>)}
          </div>
          <div className={styles.col}>
            <div className={styles.label}>Elsewhere</div>
            {SITE.socials.map((s) => <a className={styles.link} href={s.href} key={s.label}>{s.label}</a>)}
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
