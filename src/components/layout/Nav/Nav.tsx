'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BiMoon, BiSun } from 'react-icons/bi';
import { motion, useReducedMotion } from 'motion/react';
import { ZoneCrossfade } from '@/components/motion/ZoneCrossfade';
import { SITE, COPY } from '@/data';
import { useTheme } from '@/lib/theme';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { useEmail } from '@/components/ui/EmailLink';
import { PixelMark, isIconKey, type IconKey } from '@/components/ui/PixelMark';
import { Container } from '../Container';
import { NavMenu } from './NavMenu';
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

/**
 * The accent fill behind the monogram / CTA. Crossfades on a Zone change via
 * ZoneCrossfade — the same dissolve the Bloom uses (a clean opacity fade rather
 * than an OKLab interpolation through muddy midpoints). Sits behind the text via
 * the parent's `isolation` + the fill's negative z-index.
 */
function AccentFill({ accent }: { accent: string }) {
  return <ZoneCrossfade zoneKey={accent} as="span" className={styles.fill} style={{ background: accent }} />;
}

export function Nav({ active, accent, accentInk, onAccent }: NavProps) {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const { email, mailto } = useEmail();
  const isActive = (label: string) => active != null && label.toLowerCase() === active.toLowerCase();
  // active section → pixel-mark glyph (home on '/'); unknown segments fall back to home
  const markIcon: IconKey = isIconKey(active) ? active : 'home';
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
    // recompute on container resize + once the display font swaps in (item widths shift)
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [activeHref]);

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.bar} aria-label="Primary">
          {/* monogram + wordmark are two visual pieces but one "home" button */}
          <Link href="/" className={styles.brand} aria-label={COPY.nav.homeAria}>
            <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', transform: 'translateY(-1px)' }}>
              <PixelMark icon={markIcon} accent={accent} size={24} />
            </span>
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
              <AccentFill accent={accent} />
              {/* exactly one span is `display`-shown per breakpoint (the other is
                  display:none, so excluded from the a11y name) — so neither needs
                  aria-hidden; whichever is visible becomes the link's accessible name. */}
              <span className={styles.ctaFull}>{email ?? 'Email me'} <LinkArrow /></span>
              <span className={styles.ctaShort}>{COPY.nav.sayHi} <LinkArrow /></span>
            </a>
          </div>

          {/* Mobile: burger → glass dropdown */}
          <NavMenu active={active} accent={accent} accentInk={accentInk} onAccent={onAccent} />
        </nav>
      </Container>
    </header>
  );
}
