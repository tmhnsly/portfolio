'use client';
import Link from 'next/link';
import type { IconType } from 'react-icons';
import { BiMoon, BiSun, BiMenu, BiCodeAlt, BiVideo, BiCamera, BiMusic, BiHeadphone, BiPencil, BiUser } from 'react-icons/bi';
import { motion, useReducedMotion } from 'motion/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { SITE, COPY } from '@/data';
import { useTheme } from '@/lib/theme';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { useEmail } from '@/components/ui/EmailLink';
import { Container } from '../Container';
import styles from './Nav.module.scss';

export interface NavProps {
  /** active discipline slug or 'about' */
  active?: string;
  /** resolved zone accent tokens (from the Shell) — set inline on the portaled
      dropdown, which renders outside the Shell's --accent scope */
  accent: string;
  accentInk: string;
  onAccent: string;
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

export function Nav({ active, accent, accentInk, onAccent }: NavProps) {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const { email, mailto } = useEmail();
  const isActive = (label: string) => active != null && label.toLowerCase() === active.toLowerCase();
  // accent/accentInk/onAccent come resolved from the Shell (single Zone source);
  // the dropdown portals to <body>, outside the Shell's --accent scope, so they're
  // set inline on the Content below.

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.bar} aria-label="Primary">
          {/* monogram + wordmark are two visual pieces but one "home" button */}
          <Link href="/" className={styles.brand} aria-label={COPY.nav.homeAria}>
            <span className={styles.monogram}>TH</span>
            <span className={styles.name}>Tom Hinsley</span>
          </Link>

          {/* Desktop: inline items. The active route's dark pill is a shared-layout
              element (layoutId) so it SLIDES between items on navigation rather
              than cross-fading. The label sits above the pill (z-index). */}
          <ul className={styles.items}>
            {SITE.nav.map((item) => {
              const activeItem = isActive(item.label);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={activeItem ? `${styles.item} ${styles.active}` : styles.item}
                    aria-current={activeItem ? 'page' : undefined}
                  >
                    {activeItem && (
                      <motion.span
                        aria-hidden
                        className={styles.pill}
                        layoutId="navActivePill"
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={styles.label}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
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
            <a className={styles.cta} href={mailto()}>
              {/* exactly one span is `display`-shown per breakpoint (the other is
                  display:none, so excluded from the a11y name) — so neither needs
                  aria-hidden; whichever is visible becomes the link's accessible name. */}
              <span className={styles.ctaFull}>{email ?? 'Email me'} <LinkArrow /></span>
              <span className={styles.ctaShort}>{COPY.nav.sayHi} <LinkArrow /></span>
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
                  <a href={mailto()} className={styles.menuCta}>{email ?? 'Email me'} <LinkArrow /></a>
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
