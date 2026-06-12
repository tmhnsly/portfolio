'use client';
import { useState } from 'react';
import type { Project } from '@/types';
import { IMG_SIZES } from '@/lib/breakpoints';
import { Media } from '@/components/ui/Media';
import { ProjectThumb } from '@/components/project-thumbs';
import { mediaHeroView, projectPresentation } from '@/lib/project-presentation';
import { MediaCarousel } from '@/components/project/MediaCarousel';
import { YouTubeEmbed } from '@/components/project/YouTubeEmbed';
import { BiPlay } from 'react-icons/bi';
import styles from './MediaHero.module.scss';

export function MediaHero({ project }: { project: Project }) {
  const { gradient } = projectPresentation(project);
  const [open, setOpen] = useState(false);
  const view = mediaHeroView(project);

  if (view.mode === 'gradient') {
    return (
      <div className={styles.embed}>
        <ProjectThumb project={project} ratio="16/9" sizes={IMG_SIZES.full} priority />
      </div>
    );
  }

  // A lone video plays inline in the hero (scroll-and-watch); no pop-out carousel.
  if (view.mode === 'video') {
    const v = view.item;
    return (
      <div className={styles.embed}>
        <YouTubeEmbed id={v.id} list={v.list} poster={v.poster} title={v.title} grad={gradient} />
      </div>
    );
  }

  return (
    <div className={styles.embed}>
      <button type="button" className={styles.poster} onClick={() => setOpen(true)} aria-label={view.isVideo ? 'Play video' : 'View media'}>
        <Media grad={gradient} src={view.cover.src} alt={view.cover.alt} ratio="16/9" sizes={IMG_SIZES.full} priority>
          {view.isVideo && <span className={styles.play} aria-hidden><BiPlay /></span>}
          {view.count > 1 && <span className={styles.badge} aria-hidden>1 / {view.count}</span>}
        </Media>
      </button>
      {open && <MediaCarousel items={project.media} startIndex={0} gradient={gradient} onClose={() => setOpen(false)} />}
    </div>
  );
}
