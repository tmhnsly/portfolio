'use client';
import { useEffect, useRef, useState } from 'react';
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

  // Active-route pill: a single element measured against the list and sprung to
  // the active item. Deliberately NOT a layoutId shared-layout element — that
  // baked the pre-navigation scroll offset into its from-box, so a route change
  // (which resets scrollY to 0) made it fly up from where the page was scrolled.
  // offsetLeft/Top are relative to the list, so this is scroll-independent.
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
  const activeHref = SITE.nav.find((i) => isActive(i.label))?.href;
  const [box, setBox] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = activeHref ? itemRefs.current.get(activeHref) : undefined;
      setBox(el ? { left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight } : null);
    };
    measure();
    const list = listRef.current;
    const ro = list ? new ResizeObserver(measure) : null;
    ro?.observe(list!);
    // recompute once the display font swaps in (item widths shift)
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro?.disconnect();
  }, [activeHref]);

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.bar} aria-label="Primary">
          {/* monogram + wordmark are two visual pieces but one "home" button */}
          <Link href="/" className={styles.brand} aria-label={COPY.nav.homeAria}>
            <span className={styles.monogram}>TH</span>
            <span className={styles.name}>Tom Hinsley</span>
          </Link>

          {/* Desktop: inline items. The active route's dark pill SLIDES between
              items on navigation (the motion.li below, sprung to the measured
              active item). The label sits above the pill (z-index). Until JS
              measures, `.active` carries a CSS background so first paint is
              flash-free; `.hasPill` hands that role to the pill once measured. */}
          <ul ref={listRef} className={box ? `${styles.items} ${styles.hasPill}` : styles.items}>
            {SITE.nav.map((item) => {
              const activeItem = isActive(item.label);
              return (
                <li key={item.href}>
                  <Link
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.href, el);
                      else itemRefs.current.delete(item.href);
                    }}
                    href={item.href}
                    className={activeItem ? `${styles.item} ${styles.active}` : styles.item}
                    aria-current={activeItem ? 'page' : undefined}
                  >
                    <span className={styles.label}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
            {box && (
              <motion.li
                aria-hidden
                className={styles.pill}
                initial={false}
                animate={box}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
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
