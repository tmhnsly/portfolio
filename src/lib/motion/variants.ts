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
