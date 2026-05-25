import Link from 'next/link';
import { SITE, COPY } from '@/data';
import { Marquee } from '@/components/motion/Marquee';
import { EmailLink } from '@/components/ui/EmailLink';
import { Container } from '../Container';
import { FullBleed } from '../FullBleed';
import { FooterFact } from './FooterFact';
import styles from './Footer.module.scss';

export function Footer() {
  // `email` items render via <EmailLink> (address revealed client-side); `label`
  // set = a worded link (e.g. "Get in touch"), omitted = show the address.
  const marqueeItems: { text?: string; email?: boolean; label?: string }[] = [
    { text: SITE.name },
    { email: true },
    ...COPY.footer.marqueeExtra.map((text) => (/touch/i.test(text) ? { email: true, label: text } : { text })),
  ];

  return (
    <footer className={styles.footer}>
      <FullBleed>
        <div className={styles.rules}>
          <Marquee faded>
            <span className={styles.row}>
              {marqueeItems.map((item, i) => (
                <span key={i} className={styles.item}>
                  {item.email ? (
                    <EmailLink className={styles.marqueeLink}>{item.label}</EmailLink>
                  ) : (
                    item.text
                  )}
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
            <div className={styles.label}>{SITE.name}</div>
            <p>{COPY.footer.bio}</p>
          </div>
          <div className={styles.col}>
            <div className={styles.label}>{COPY.footer.sections}</div>
            {SITE.nav.filter((n) => n.label !== 'About').map((n) => <Link className={styles.link} href={n.href} key={n.href}>{n.label}</Link>)}
          </div>
          <div className={styles.col}>
            <div className={styles.label}>{COPY.footer.elsewhere}</div>
            {SITE.socials.map((s) => <a className={styles.link} href={s.href} key={s.label}>{s.label}</a>)}
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
