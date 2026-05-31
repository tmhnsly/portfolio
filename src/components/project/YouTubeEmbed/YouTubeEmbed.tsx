'use client';
import { useState } from 'react';
import { Media } from '@/components/ui/Media';
import { IMG_SIZES } from '@/lib/breakpoints';
import { youTubeEmbedUrl, youTubeThumbnail } from '@/lib/youtube';
import styles from './YouTubeEmbed.module.scss';

export function YouTubeEmbed({ id, poster, title, grad }: { id: string; poster?: string; title?: string; grad?: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          src={youTubeEmbedUrl(id, { autoplay: true })}
          title={title ?? 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className={styles.facade} onClick={() => setPlaying(true)} aria-label={title ? `Play ${title}` : 'Play video'}>
      <Media grad={grad} src={poster ?? youTubeThumbnail(id)} alt={title ?? ''} ratio="16/9" sizes={IMG_SIZES.full} className={styles.poster}>
        <span className={styles.play} aria-hidden>▶</span>
      </Media>
    </button>
  );
}
