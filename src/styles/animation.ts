export const animation = {
  ease: {
    out: [0.16, 1, 0.3, 1] as const,
    inOut: [0.6, 0, 0.2, 1] as const,
  },
  duration: {
    fast: 0.24,
    base: 0.45,
    slow: 0.6,
  },
  reveal: {
    y: 14,
    stagger: 0.35,
    delay: 0.05,
    once: true,
    margin: "0px 0px -12% 0px",
  },
} as const;
