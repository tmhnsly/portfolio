import type { Project } from '@/types';
import { IMG_SIZES } from '@/lib/breakpoints';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Media } from '@/components/ui/Media';
import styles from './Gallery.module.scss';

type GalleryFrame = Project['gallery'][number];

export function Gallery({ frames }: { frames: GalleryFrame[] }) {
  if (!frames || frames.length === 0) return null;

  return (
    <section className={styles.gallery}>
      <Eyebrow>Gallery</Eyebrow>
      <div className={styles.grid}>
        {frames.map((frame, i) => (
          <div key={i} className={styles.item}>
            <Media
              grad={frame.grad}
              src={frame.src}
              alt={frame.alt ?? frame.caption}
              ratio="4/3"
              sizes={IMG_SIZES.grid3}
            >
              <span className={styles.figLabel} aria-hidden>
                Fig. {String(i + 1).padStart(2, '0')}
              </span>
            </Media>
            <p className={styles.caption}>{frame.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
