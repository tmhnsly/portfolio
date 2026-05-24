'use client';
import { motion, useReducedMotion } from 'motion/react';
import { revealVariants } from '@/lib/motion';

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
