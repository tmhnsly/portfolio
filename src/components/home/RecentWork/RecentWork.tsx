'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/types';
import { DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FilterPills } from '@/components/ui/FilterPills';
import { TechChip } from '@/components/ui/TechChip';
import { Media } from '@/components/ui/Media';
import { Pill } from '@/components/ui/Pill';
import { formatMonthYear } from '@/lib/format';
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
  const fd = DISCIPLINES[featured.discipline];

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className={styles.title}>Recent<span className={styles.period}>.</span></h2>
        </div>
        <FilterPills items={filters} active={active} onSelect={setActive} />
      </div>
      <div className={styles.grid}>
        <Link href={`/${featured.discipline}/${featured.slug}`} className={styles.featured}>
          <Media grad={fd.gradient} src={featured.cover?.src} alt={featured.cover?.alt ?? featured.title}
            ratio="16/10" sizes="(min-width: 1200px) 60vw, 100vw" className={styles.featuredMedia}>
            <span className={styles.pillTL}><Pill label={`${fd.label} — featured`} tone="solid" /></span>
          </Media>
          <div className={styles.featuredMeta}>
            <div>
              <div className={styles.featuredTitle}>{featured.title}</div>
              {featured.desc && <div className={styles.featuredDesc}>{featured.desc}</div>}
              <div className={styles.chips}>{featured.tech.slice(0, 4).map((t) => <TechChip key={t} label={t} />)}</div>
            </div>
            <span className={styles.date}>{formatMonthYear(featured.date)} →</span>
          </div>
        </Link>
        <div className={styles.thumbs}>
          {thumbs.map((p) => {
            const d = DISCIPLINES[p.discipline];
            return (
              <Link key={p.slug} href={`/${p.discipline}/${p.slug}`} className={styles.thumb}>
                <Media grad={d.gradient} src={p.cover?.src} alt={p.cover?.alt ?? p.title}
                  ratio="4/3" sizes="(min-width: 768px) 200px, 40vw" className={styles.thumbMedia}>
                  <span className={styles.pillSm}><Pill label={d.label} tone="solid" /></span>
                </Media>
                <div className={styles.thumbMeta}>
                  <div className={styles.thumbTitle}>{p.title}</div>
                  {p.desc && <div className={styles.thumbDesc}>{p.desc}</div>}
                  <div className={styles.chips}>{p.tech.slice(0, 2).map((t) => <TechChip key={t} label={t} />)}</div>
                  <span className={styles.dateSm}>{formatMonthYear(p.date)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.foot}>
        <span>{thumbs.length + 1} of {filtered.length} shown</span>
        <Link href={featured ? `/${featured.discipline}` : '/'} className={styles.everything}>Everything →</Link>
      </div>
    </section>
  );
}
