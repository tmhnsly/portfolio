'use client';
import Link from 'next/link';
import type { IconType } from 'react-icons';
import { BiMenu, BiMoon, BiSun, BiCodeAlt, BiVideo, BiHeadphone, BiPencil, BiUser } from 'react-icons/bi';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { SITE } from '@/data';
import { useTheme } from '@/lib/theme';
import { useEmail } from '@/components/ui/EmailLink';
import { LinkArrow } from '@/components/ui/LinkArrow';
import styles from './Nav.module.scss';

/** A relevant boxicon per nav destination, shown in the mobile burger menu. */
const NAV_ICONS: Record<string, IconType> = {
  '/code': BiCodeAlt,
  '/video': BiVideo,
  '/audio': BiHeadphone,
  '/blog': BiPencil,
  '/about': BiUser,
};

/**
 * Mobile nav: a burger that opens a glass dropdown (the links + email + theme
 * toggle). It portals to <body>, outside the Shell's --accent scope, so the
 * resolved zone accent tokens are set inline on the Content.
 */
export function NavMenu({
  active,
  accent,
  accentInk,
  onAccent,
}: {
  active?: string;
  accent: string;
  accentInk: string;
  onAccent: string;
}) {
  const { theme, toggle } = useTheme();
  const { email, mailto } = useEmail();
  const isActive = (label: string) => active != null && label.toLowerCase() === active.toLowerCase();

  return (
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
  );
}
