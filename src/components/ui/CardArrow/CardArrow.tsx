import { LinkArrow } from '@/components/ui/LinkArrow';
import { cx } from '@/lib/cx';
import styles from './CardArrow.module.scss';

/**
 * The shared "this card links out" affordance — the brand LinkArrow, right-
 * aligned at the top-right of a card's head row (matching DisciplineCard). Pass
 * the card's own arrow class so the card can nudge + accent it on hover
 * (`.card:hover .<thatClass> { transform: translateX(3px); color: var(--accent-ink) }`).
 */
export function CardArrow({ className }: { className?: string }) {
  return <LinkArrow className={cx(styles.cardArrow, className)} />;
}
