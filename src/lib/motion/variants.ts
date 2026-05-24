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
// A more deliberate cascade (slower stagger + a beat before it starts) reads as
// considered rather than rushed — see the entrance tuning in DURATION/STAGGER.
export const entranceStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.entrance, delayChildren: 0.12 } },
};
export const entranceItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.entrance, ease: EASING.standard } },
};
// title mask reveal — the heading slides up from behind a clip (see EntranceTitle).
// A smaller leap (100% vs 115%) over a slightly longer beat lands more smoothly.
// Tune this one place and every page title changes.
export const titleReveal: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { duration: DURATION.title, ease: EASING.standard } },
};
