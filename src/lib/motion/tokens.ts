export const DURATION = { fast: 0.16, base: 0.24, medium: 0.32, reveal: 0.42, bloom: 0.52, hover: 0.26 } as const;
export const EASING = { standard: [0.2, 0.7, 0.3, 1] as const, out: 'easeOut', inOut: 'easeInOut', linear: 'linear' } as const;
export const OFFSET = { revealY: 20, hoverLift: -6, deckExitY: 24, deckExitScale: 0.92 } as const;
export const STAGGER = { layers: 0.032, entries: 0.06 } as const;
export const MARQUEE_SECONDS = 40;
