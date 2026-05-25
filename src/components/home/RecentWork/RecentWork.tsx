'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/types';
import { DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import { projectPresentation } from '@/lib/project-presentation';
import { IMG_SIZES } from '@/lib/breakpoints';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FilterPills } from '@/components/ui/FilterPills';
import { Media } from '@/components/ui/Media';
import { Pill } from '@/components/ui/Pill';
import { LinkArrow } from '@/components/ui/LinkArrow';
import styles from './RecentWork.module.scss';

export function RecentWork({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const filters = useMemo(() => {
    const perDiscipline = DISCIPLINE_ORDER
      .map((slug) => ({ label: DISCIPLINES[slug].label, count: projects.filter((p) => p.discipline === slug).length }))
      .filter((f) => f.count > 0);
    return [{ label: 'All', count: projects.length }, ...perDiscipline];
  }, [projects]);

  const activeLabel = filters[active]?.label ?? 'All';
  const filtered = active === 0 ? projects : projects.filter((p) => DISCIPLINES[p.discipline].label === activeLabel);
  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const thumbs = filtered.filter((p) => p !== featured).slice(0, 3);
  if (!featured) return null;
  const fp = projectPresentation(featured);

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div>
          <Eyebrow>{COPY.home.selectedWork}</Eyebrow>
          <h2 className={styles.title}>{COPY.home.recent}<span className={styles.period}>.</span></h2>
        </div>
        <FilterPills items={filters} active={active} onSelect={setActive} />
      </div>
      <div className={styles.grid}>
        <Link href={fp.href} className={styles.featured}>
          <Media grad={fp.gradient} src={featured.cover?.src} alt={featured.cover?.alt ?? featured.title}
            ratio="16/10" sizes={IMG_SIZES.full} className={styles.featuredMedia}>
            <span className={styles.arrowTR}><LinkArrow className={styles.arrow} /></span>
          </Media>
          <div className={styles.featuredMeta}>
            <div className={styles.featuredTitle}>{featured.title}</div>
            {featured.desc && <div className={styles.featuredDesc}>{featured.desc}</div>}
            <span className={styles.pill}><Pill label={`${fp.label} — featured`} tone="discipline" color={fp.color} onColor={fp.onColor} /></span>
          </div>
        </Link>
        <div className={styles.thumbs}>
          {thumbs.map((p) => {
            const tp = projectPresentation(p);
            return (
              <Link key={p.slug} href={tp.href} className={styles.thumb}>
                <Media grad={tp.gradient} src={p.cover?.src} alt={p.cover?.alt ?? p.title}
                  ratio="4/3" sizes={IMG_SIZES.thumb} className={styles.thumbMedia}>
                  <span className={styles.arrowTRSm}><LinkArrow className={styles.arrow} /></span>
                </Media>
                <div className={styles.thumbMeta}>
                  <div className={styles.thumbTitle}>{p.title}</div>
                  {p.desc && <div className={styles.thumbDesc}>{p.desc}</div>}
                  <span className={styles.pill}><Pill label={tp.label} tone="discipline" color={tp.color} onColor={tp.onColor} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.foot}>
        <span>{thumbs.length + 1} of {filtered.length} shown</span>
        <Link href={featured ? `/${featured.discipline}` : '/'} className={styles.everything}>{COPY.home.everything}</Link>
      </div>
    </section>
  );
}
