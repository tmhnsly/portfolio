/*
 * Pass a `sizes` recipe from IMG_SIZES (src/lib/breakpoints.ts) — e.g.
 * IMG_SIZES.full (hero/cover/embed), IMG_SIZES.grid3 (3-up grid/gallery),
 * IMG_SIZES.thumb (recent/small card) — so breakpoint widths stay centralised.
 */

import Image from 'next/image';
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
  const cls = [styles.frame, rounded ? styles.rounded : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ aspectRatio: ratio, ...(grad && !src ? { background: grad } : null) }}>
      {src && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={styles.img} />}
      {children}
    </div>
  );
}
