import type { ReactNode } from 'react';
import type { Project } from '@/types';
import { Media } from '@/components/ui/Media';
import { coverImage } from '@/lib/project-presentation';
import { PROJECT_THUMBS } from './registry';

export interface ProjectThumbProps {
  project: Project;
  grad: string;          // discipline gradient — the <Media> fallback / vignette field
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  className?: string;
  children?: ReactNode;  // card chrome overlays (discipline pill, link arrow)
}

/**
 * A project card's cover. Projects with a bespoke thumbnail in the registry
 * (currently the code pieces) render that vector vignette inside the standard
 * <Media> frame; everything else falls back to the project's cover image, or the
 * discipline gradient when there's no media. `children` are the card's overlay
 * chrome and layer on top of the cover either way.
 */
export function ProjectThumb({ project, grad, ratio, sizes, priority, rounded, className, children }: ProjectThumbProps) {
  const Thumb = PROJECT_THUMBS[project.slug];
  if (Thumb) {
    return (
      <Media grad={grad} alt="" ratio={ratio} sizes={sizes} priority={priority} rounded={rounded} className={className}>
        <Thumb />
        {children}
      </Media>
    );
  }
  const cover = coverImage(project);
  return (
    <Media grad={grad} src={cover.src} alt={cover.alt} ratio={ratio} sizes={sizes} priority={priority} rounded={rounded} className={className}>
      {children}
    </Media>
  );
}
