export const DURATION = { fast: 0.16, base: 0.24, medium: 0.32, reveal: 0.42, bloom: 0.52, hover: 0.26, entrance: 0.5, title: 0.62, zone: 0.34 } as const;
// standard = a smooth ease-out (easeOutQuint): quick response, long soft landing.
// Reads noticeably smoother than the old [0.2,0.7,0.3,1] for entrances/hovers.
// smooth = easeInOutCubic: a gentle start AND end — for the zone/page transition
// (accent morph + bloom crossfade) so navigating eases in rather than snapping.
export const EASING = { standard: [0.22, 1, 0.36, 1] as const, smooth: [0.65, 0, 0.35, 1] as const, out: 'easeOut', inOut: 'easeInOut', linear: 'linear' } as const;
export const OFFSET = { revealY: 20, hoverLift: -6, deckExitY: 24, deckExitScale: 0.92 } as const;
export const STAGGER = { layers: 0.032, entries: 0.06, entrance: 0.09 } as const;
export const MARQUEE_SECONDS = 40;
