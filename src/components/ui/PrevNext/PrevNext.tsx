import Link from 'next/link';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import styles from './PrevNext.module.scss';

export interface PrevNextItem {
  href: string;
  title: string;
}

interface PrevNextProps {
  ariaLabel: string;   // the <nav> label — "Project navigation" / "Post navigation"
  prevLabel: string;   // direction caption — "Previous in /code" / "Older post"
  nextLabel: string;   // "Next in /code" / "Newer post"
  prev?: PrevNextItem; // absent → a muted, non-interactive "—" placeholder
  next?: PrevNextItem;
}

/** One side of the pager: a link to the neighbour, or — when there's none — the
    muted "—" placeholder. Concentrates the optional-link-with-disabled-fallback
    that the project and blog pagers previously each hand-rolled. */
function Slot({ item, label, dir }: { item?: PrevNextItem; label: string; dir: 'prev' | 'next' }) {
  const right = dir === 'next';
  const caption = right
    ? <span className={styles.dir}>{label} <BiRightArrowAlt className={styles.dirIcon} aria-hidden /></span>
    : <span className={styles.dir}><BiLeftArrowAlt className={styles.dirIcon} aria-hidden /> {label}</span>;
  const body = (
    <>
      {caption}
      <span className={styles.title}>{item?.title ?? '—'}</span>
    </>
  );
  const cls = right ? `${styles.link} ${styles.right}` : styles.link;
  return (
    <div className={styles.card}>
      {item
        ? <Link href={item.href} className={cls}>{body}</Link>
        : <div className={`${cls} ${styles.disabled}`}>{body}</div>}
    </div>
  );
}

/**
 * A two-up previous / next pager. Content-agnostic: the caller resolves the hrefs
 * and supplies the direction captions, so Projects pass "Previous in /code" and
 * Posts pass "Older post" through the same module. An absent neighbour renders a
 * disabled "—" slot rather than a link.
 */
export function PrevNext({ ariaLabel, prevLabel, nextLabel, prev, next }: PrevNextProps) {
  return (
    <nav className={styles.prevNext} aria-label={ariaLabel}>
      <Slot item={prev} label={prevLabel} dir="prev" />
      <Slot item={next} label={nextLabel} dir="next" />
    </nav>
  );
}
