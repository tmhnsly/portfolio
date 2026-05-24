import Link from 'next/link';
import { SITE, COPY } from '@/data';
import { Marquee } from '@/components/motion/Marquee';
import { Container } from '../Container';
import { FullBleed } from '../FullBleed';
import { FooterFact } from './FooterFact';
import styles from './Footer.module.scss';

export function Footer() {
  const mailto = `mailto:${SITE.email}`;
  const marqueeItems: { text: string; href?: string }[] = [
    { text: SITE.name },
    { text: SITE.email, href: mailto },
    ...COPY.footer.marqueeExtra.map((text) => ({ text, href: /touch/i.test(text) ? mailto : undefined })),
  ];

  return (
    <footer className={styles.footer}>
      <FullBleed>
        <div className={styles.rules}>
          <Marquee faded>
            <span className={styles.row}>
              {marqueeItems.map((item, i) => (
                <span key={i} className={styles.item}>
                  {item.href ? (
                    <a href={item.href} className={styles.marqueeLink}>{item.text}</a>
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
