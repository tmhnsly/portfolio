import type { Variants } from 'motion/react';
import { DURATION, EASING, OFFSET, STAGGER } from './tokens';

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: OFFSET.revealY },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASING.standard } },
};
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.entries } },
};
export const entranceStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.entries, delayChildren: 0.05 } },
};
export const entranceItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASING.standard } },
};
// title mask reveal — the heading slides up from behind a clip (see EntranceTitle).
// Tune this one place and every page title changes.
export const titleReveal: Variants = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: DURATION.bloom, ease: EASING.standard } },
};
