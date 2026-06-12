'use client';
import { ZoneCrossfade } from '@/components/motion/ZoneCrossfade';
import styles from './Bloom.module.scss';

/**
 * Ambient background bloom. Viewport-anchored so it reads identically on every page.
 *
 * Performance: the colour is a STATIC per-instance tint (`--bloom-tint`), not the
 * live (transitioning) `--accent` — otherwise the three blur(50px) layers would
 * re-rasterise every frame for the whole transition. On a Zone change the tint
 * crossfades via ZoneCrossfade (two tinted instances, opacity, GPU-composited),
 * which also avoids the hard edge the old scale animation produced by clipping the
 * blurred halo.
 */
export function Bloom({ zone = 'default', tint }: { zone?: string; tint?: string }) {
  const style = tint ? ({ '--bloom-tint': tint } as React.CSSProperties) : undefined;
  return (
    <ZoneCrossfade zoneKey={zone} className={styles.bloom} style={style}>
      <div className={styles.primary} />
      <div className={styles.cool} />
      <div className={styles.warm} />
      <div className={styles.grain} />
    </ZoneCrossfade>
  );
}
