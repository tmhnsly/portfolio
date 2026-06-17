'use client';
import { useState } from 'react';
import { Media } from '@/components/ui/Media';
import { IMG_SIZES } from '@/lib/breakpoints';
import { youTubeEmbedUrl, youTubePoster } from '@/lib/youtube';
import { BiPlay } from 'react-icons/bi';
import styles from './YouTubeEmbed.module.scss';

export function YouTubeEmbed({ id, list, poster, title, grad, autoPlay = false }: { id: string; list?: string; poster?: string; title?: string; grad?: string; autoPlay?: boolean }) {
  const [playing, setPlaying] = useState(autoPlay);

  if (playing) {
    return (
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          src={youTubeEmbedUrl(id, { autoplay: true, list })}
          title={title ?? 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className={styles.facade} onClick={() => setPlaying(true)} aria-label={title ? `Play ${title}` : 'Play video'}>
      <Media grad={grad} src={youTubePoster(id, poster)} alt={title ?? ''} ratio="16/9" sizes={IMG_SIZES.full} className={styles.poster}>
        <span className={styles.play} aria-hidden><BiPlay /></span>
      </Media>
    </button>
  );
}
