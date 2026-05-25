import { BiRightArrowAlt } from 'react-icons/bi';
import styles from './LinkArrow.module.scss';

/**
 * Consistent "this navigates / opens" affordance — a boxicon arrow at currentColor,
 * so it stays consistent and aligned with text everywhere (replaces the assorted
 * unicode →/↗ glyphs). Default size is 1.2em (card emphasis); pass `inline` to
 * size it to the surrounding text (1em) for inline links.
 */
export function LinkArrow({ className, inline = false }: { className?: string; inline?: boolean }) {
  return (
    <BiRightArrowAlt
      aria-hidden
      className={[styles.arrow, inline && styles.inline, className].filter(Boolean).join(' ')}
    />
  );
}
