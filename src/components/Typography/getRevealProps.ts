import type { MotionProps } from "motion/react";
import { animation } from "@/styles/animation";

export type RevealOptions = {
  reveal?: boolean;
  delay?: number;
};

export function getRevealProps(opts?: RevealOptions): MotionProps | null {
  if (!opts?.reveal) return null;

  return {
    initial: { opacity: 0, y: animation.reveal.y },
    whileInView: { opacity: 1, y: 0 },
    viewport: {
      once: animation.reveal.once,
      margin: animation.reveal.margin,
    },
    transition: {
      duration: animation.duration.base,
      ease: animation.ease.out,
      delay: opts.delay ?? animation.reveal.delay,
    },
  };
}
