import type { Project } from '@/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Media } from '@/components/ui/Media';
import styles from './Gallery.module.scss';

type GalleryFrame = Project['gallery'][number];

export function Gallery({ frames }: { frames: GalleryFrame[] }) {
  if (!frames || frames.length === 0) return null;

  return (
    <section className={styles.gallery}>
      <Eyebrow>§ 02 — Gallery</Eyebrow>
      <div className={styles.grid}>
        {frames.map((frame, i) => (
          <div key={i} className={styles.item}>
            <Media
              grad={frame.grad}
              src={frame.src}
              alt={frame.alt ?? frame.caption}
              ratio="4/3"
              sizes="(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 90vw"
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
