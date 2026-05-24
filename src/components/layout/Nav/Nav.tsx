'use client';
import Link from 'next/link';
import { BiMoon, BiSun } from 'react-icons/bi';
import { SITE, COPY } from '@/data';
import { useTheme } from '@/lib/theme';
import { Container } from '../Container';
import styles from './Nav.module.scss';

export interface NavProps {
  /** active discipline slug or 'about' */
  active?: string;
}

export function Nav({ active }: NavProps) {
  const { theme, toggle } = useTheme();
  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.bar} aria-label="Primary">
          <div className={styles.brand}>
            <Link href="/" className={styles.monogram} aria-label={COPY.nav.homeAria}>TH</Link>
            <span className={styles.name}>Tom Hinsley</span>
          </div>
          <ul className={styles.items}>
            {SITE.nav.map((item) => {
              const isActive = active != null && item.label.toLowerCase() === active.toLowerCase();
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive ? `${styles.item} ${styles.active}` : styles.item}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.toggle}
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <BiSun aria-hidden /> : <BiMoon aria-hidden />}
            </button>
            <a className={styles.cta} href={`mailto:${SITE.email}`}>
              <span className={styles.ctaFull}>{SITE.email} →</span>
              <span className={styles.ctaShort} aria-hidden="true">{COPY.nav.sayHi}</span>
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
