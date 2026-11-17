import Link from 'next/link';
import { SITE, COPY } from '@/data';
import { EmailLink } from '@/components/ui/EmailLink';
import { Container } from '../Container';
import { FullBleed } from '../FullBleed';
import { FooterFact } from './FooterFact';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <FullBleed>
        <div className={styles.rules}>
          <Container>
            <div className={styles.row}>
              <span className={styles.item}>{SITE.name}<span className={styles.period}>.</span></span>
              {/* no children: the address is revealed client-side by EmailLink */}
              <span className={styles.item}><EmailLink className={styles.emailLink} /></span>
            </div>
          </Container>
        </div>
      </FullBleed>
      <Container>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.label}>{SITE.name}</div>
            <p>{COPY.footer.bio}</p>
          </div>
          <div className={styles.col}>
            <div className={styles.label}>{COPY.footer.sections}</div>
            {SITE.nav.filter((n) => n.label !== 'About').map((n) => <Link className={styles.link} href={n.href} key={n.href}>{n.label}</Link>)}
          </div>
          <div className={styles.col}>
            <div className={styles.label}>{COPY.footer.elsewhere}</div>
            {SITE.socials.map((s) => <a className={styles.link} href={s.href} key={s.label} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
          </div>
          <div className={styles.col}>
            <div className={styles.label}>{COPY.footer.factLabel}</div>
            <FooterFact />
          </div>
          <div className={`${styles.col} ${styles.right}`}>
            <div className={styles.label}>{COPY.footer.copyright} {new Date().getFullYear()}</div>
            <div>{COPY.footer.version}</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
