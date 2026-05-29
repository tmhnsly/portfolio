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

// (Removed: entranceStagger / entranceItem / titleReveal — the page entrance is now
// CSS-driven in components/motion/Entrance/Entrance.module.scss so it runs at first
// paint, no JS-hydration wait. DURATION.entrance / .title and STAGGER.entrance in
// tokens are now unreferenced but kept; the SCSS hardcodes the timing.)
