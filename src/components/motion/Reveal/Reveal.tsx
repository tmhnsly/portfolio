'use client';
import { motion, useReducedMotion } from 'motion/react';
import { revealVariants } from '@/lib/motion';

/**
 * Scroll-triggered fade-up for ordinary content blocks — Motion-driven, fires
 * once at ~20% visibility. For the bespoke project thumbs, whose entrance is
 * authored as SCSS keyframes, use RevealThumb/useReveal instead (CSS-class
 * driven). The two are intentionally separate mechanisms — see ADR-0002.
 */
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
