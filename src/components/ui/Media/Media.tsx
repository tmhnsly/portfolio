/*
 * Pass a `sizes` recipe from IMG_SIZES (src/lib/breakpoints.ts) — e.g.
 * IMG_SIZES.full (hero/cover/embed), IMG_SIZES.grid3 (3-up grid/gallery),
 * IMG_SIZES.thumb (recent/small card) — so breakpoint widths stay centralised.
 *
 * Reveal on load: the image sits over the discipline `grad` and fades + settles in
 * once it decodes, so images don't pop when a page loads. The reveal is tied to the
 * section colour via `grad` (the gradient shows through until the image arrives).
 */
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cx } from '@/lib/cx';
import styles from './Media.module.scss';

export interface MediaProps {
  src?: string;
  grad?: string;
  alt?: string;
  ratio?: string;   // e.g. '16/10', '4/3'
  sizes?: string;   // responsive hint
  priority?: boolean;
  rounded?: boolean;
  className?: string;
  children?: React.ReactNode; // overlays: labels, swatches, big number, hatch
}

export function Media({ src, grad, alt = '', ratio = '4/3', sizes = '100vw', priority, rounded = true, className, children }: MediaProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // A cached image can finish before React attaches `onLoad`, so it would never
  // fire — catch that case on mount via the element's `complete` flag.
  useEffect(() => { if (ref.current?.complete) setLoaded(true); }, []);

  const cls = cx(styles.frame, rounded && styles.rounded, className);
  return (
    <div className={cls} style={{ aspectRatio: ratio }}>
      {grad && (
        <span aria-hidden className={`${styles.grad} ${loaded ? styles.gradHidden : ''}`} style={{ background: grad }} />
      )}
      {src && (
        <Image
          ref={ref}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${styles.img} ${loaded ? styles.loaded : ''}`}
          onLoad={() => setLoaded(true)}
        />
      )}
      {children}
    </div>
  );
}
