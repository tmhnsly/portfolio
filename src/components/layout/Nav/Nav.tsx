'use client';
import Link from 'next/link';
import { BiMoon, BiSun, BiMenu } from 'react-icons/bi';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { tomato } from '@radix-ui/colors';
import { SITE, COPY } from '@/data';
import { DISCIPLINES, isDiscipline } from '@/lib/disciplines';
import { useTheme } from '@/lib/theme';
import { Container } from '../Container';
import styles from './Nav.module.scss';

export interface NavProps {
  /** active discipline slug or 'about' */
  active?: string;
}

export function Nav({ active }: NavProps) {
  const { theme, toggle } = useTheme();
  const isActive = (label: string) => active != null && label.toLowerCase() === active.toLowerCase();
  // The dropdown portals to <body>, outside the Shell's --accent scope, so set
  // the zone accent inline on the Content (mirrors how the Shell derives it).
  const accent = active && isDiscipline(active) ? DISCIPLINES[active].color : tomato.tomato9;

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.bar} aria-label="Primary">
          <div className={styles.brand}>
            <Link href="/" className={styles.monogram} aria-label={COPY.nav.homeAria}>TH</Link>
            <span className={styles.name}>Tom Hinsley</span>
          </div>

          {/* Desktop: inline items */}
          <ul className={styles.items}>
            {SITE.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.label) ? `${styles.item} ${styles.active}` : styles.item}
                  aria-current={isActive(item.label) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop: theme toggle + email CTA */}
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

          {/* Mobile: burger → glass dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button type="button" className={styles.burger} aria-label="Open menu">
                <BiMenu aria-hidden />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className={styles.menu}
                align="end"
                sideOffset={12}
                collisionPadding={16}
                style={{ '--accent': accent } as React.CSSProperties}
              >
                {SITE.nav.map((item) => (
                  <DropdownMenu.Item key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={isActive(item.label) ? `${styles.menuItem} ${styles.menuItemActive}` : styles.menuItem}
                      aria-current={isActive(item.label) ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className={styles.menuSep} />
                <DropdownMenu.Item asChild>
                  <a href={`mailto:${SITE.email}`} className={styles.menuCta}>{SITE.email} →</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className={styles.menuItem}
                  onSelect={(e) => {
                    e.preventDefault();
                    toggle();
                  }}
                >
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </nav>
      </Container>
    </header>
  );
}
