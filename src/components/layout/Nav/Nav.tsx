'use client';
import Link from 'next/link';
import type { IconType } from 'react-icons';
import { BiMoon, BiSun, BiMenu, BiCodeAlt, BiVideo, BiCamera, BiMusic, BiHeadphone, BiPencil, BiUser } from 'react-icons/bi';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { SITE, COPY } from '@/data';
import { DISCIPLINES, isDiscipline } from '@/lib/disciplines';
import { useTheme } from '@/lib/theme';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { Container } from '../Container';
import styles from './Nav.module.scss';

export interface NavProps {
  /** active discipline slug or 'about' */
  active?: string;
}

/** A relevant boxicon per nav destination, shown in the mobile burger menu. */
const NAV_ICONS: Record<string, IconType> = {
  '/code': BiCodeAlt,
  '/video': BiVideo,
  '/photo': BiCamera,
  '/music': BiMusic,
  '/sound': BiHeadphone,
  '/blog': BiPencil,
  '/about': BiUser,
};

export function Nav({ active }: NavProps) {
  const { theme, toggle } = useTheme();
  const isActive = (label: string) => active != null && label.toLowerCase() === active.toLowerCase();
  // The dropdown portals to <body>, outside the Shell's --accent scope, so set
  // the zone accent + ink + on-accent inline on the Content (mirrors the Shell).
  const zone = active && isDiscipline(active) ? DISCIPLINES[active] : null;
  const accent = zone ? zone.color : 'var(--tomato-9)';
  const accentInk = zone ? zone.ink : 'var(--tomato-11)';
  const onAccent = zone ? zone.onAccent : 'var(--white-a12)';

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.bar} aria-label="Primary">
          {/* monogram + wordmark are two visual pieces but one "home" button */}
          <Link href="/" className={styles.brand} aria-label={COPY.nav.homeAria}>
            <span className={styles.monogram}>TH</span>
            <span className={styles.name}>Tom Hinsley</span>
          </Link>

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
              <span className={styles.ctaFull}>{SITE.email} <LinkArrow /></span>
              <span className={styles.ctaShort} aria-hidden="true">{COPY.nav.sayHi} <LinkArrow /></span>
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
                style={{ '--accent': accent, '--accent-ink': accentInk, '--on-accent': onAccent } as React.CSSProperties}
              >
                {SITE.nav.map((item) => {
                  const Icon = NAV_ICONS[item.href];
                  return (
                    <DropdownMenu.Item key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={isActive(item.label) ? `${styles.menuItem} ${styles.menuItemActive}` : styles.menuItem}
                        aria-current={isActive(item.label) ? 'page' : undefined}
                      >
                        {Icon && <Icon className={styles.menuIcon} aria-hidden />}
                        {item.label}
                      </Link>
                    </DropdownMenu.Item>
                  );
                })}
                <DropdownMenu.Separator className={styles.menuSep} />
                <DropdownMenu.Item asChild>
                  <a href={`mailto:${SITE.email}`} className={styles.menuCta}>{SITE.email} <LinkArrow /></a>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className={styles.menuItem}
                  onSelect={(e) => {
                    e.preventDefault();
                    toggle();
                  }}
                >
                  {theme === 'dark' ? <BiSun className={styles.menuIcon} aria-hidden /> : <BiMoon className={styles.menuIcon} aria-hidden />}
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
