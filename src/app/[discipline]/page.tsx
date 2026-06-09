import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isDiscipline, DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import { projectsInDiscipline, topTagsByDiscipline } from '@/lib/content';
import { SECTIONS } from '@/data';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { JsonLd } from '@/components/seo';
import { Container, Stack } from '@/components/layout';
import { SectionHero } from '@/components/section/SectionHero';
import { ProjectGrid } from '@/components/section/ProjectGrid';
import { OtherDisciplines } from '@/components/section/OtherDisciplines';
import { SectionCTA } from '@/components/section/SectionCTA';

export function generateStaticParams() {
  return DISCIPLINE_ORDER.filter((d) => d !== 'blog').map((discipline) => ({ discipline }));
}

export async function generateMetadata({ params }: { params: Promise<{ discipline: string }> }): Promise<Metadata> {
  const { discipline } = await params;
  if (!isDiscipline(discipline)) return {};
  return pageMeta({ title: DISCIPLINES[discipline].label, description: SECTIONS[discipline].intro, path: `/${discipline}` });
}

export default async function SectionPage({ params }: { params: Promise<{ discipline: string }> }) {
  const { discipline } = await params;
  if (!isDiscipline(discipline)) notFound();
  const projects = projectsInDiscipline(discipline);
  const section = SECTIONS[discipline];
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: DISCIPLINES[discipline].label, url: DISCIPLINES[discipline].route },
  ];
  return (
    <Container>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Stack>
        <SectionHero discipline={discipline} intro={section.intro} tools={topTagsByDiscipline(discipline)} />
        <ProjectGrid projects={projects} />
        <OtherDisciplines current={discipline} />
        <SectionCTA discipline={discipline} />
      </Stack>
    </Container>
  );
}
