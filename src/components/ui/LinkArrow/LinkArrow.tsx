import { BiRightArrowAlt } from 'react-icons/bi';
import styles from './LinkArrow.module.scss';

/**
 * Consistent "this card navigates to a route" affordance — a boxicon arrow at a
 * fixed relative size + currentColor, so it stays consistent and aligned with
 * text everywhere (replaces the assorted unicode →/↗ glyphs).
 */
export function LinkArrow({ className }: { className?: string }) {
  return <BiRightArrowAlt aria-hidden className={[styles.arrow, className].filter(Boolean).join(' ')} />;
}
