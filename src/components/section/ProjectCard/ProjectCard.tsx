import Link from 'next/link';
import type { Project } from '@/types';
import { DISCIPLINES } from '@/lib/disciplines';
import { IMG_SIZES } from '@/lib/breakpoints';
import { ProjectThumb, hasProjectThumb } from '@/components/project-thumbs';
import { Pill } from '@/components/ui/Pill';
import { TechChip } from '@/components/ui/TechChip';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { coverImage } from '@/lib/project-presentation';
import { projectHref } from '@/lib/routes';
import { formatMonthYear } from '@/lib/format';
import { cx } from '@/lib/cx';
import styles from './ProjectCard.module.scss';

export function ProjectCard({ project, hideDiscipline = false, featured = false }: { project: Project; hideDiscipline?: boolean; featured?: boolean }) {
  const d = DISCIPLINES[project.discipline];
  const cover = coverImage(project);
  return (
    <Link href={projectHref(project.discipline, project.slug)} className={cx(styles.card, featured && styles.featured)}>
      <ProjectThumb project={project} grad={d.gradient}
        ratio={featured ? '16/10' : '4/3'} sizes={featured ? IMG_SIZES.full : IMG_SIZES.grid3} className={styles.media}>
        {!cover.src && !hasProjectThumb(project.slug) && <span className={styles.hatch} aria-hidden />}
        {!hideDiscipline && <span className={styles.pillTL}><Pill label={d.label} tone="solid" /></span>}
        <LinkArrow className={styles.arrow} />
      </ProjectThumb>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.date}>{formatMonthYear(project.date)}</span>
        </div>
        {project.desc && <div className={styles.desc}>{project.desc}</div>}
        <div className={styles.chips}>{project.tags.map((t) => <TechChip key={t} label={t} />)}</div>
      </div>
    </Link>
  );
}
