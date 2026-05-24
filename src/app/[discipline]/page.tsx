import { notFound } from 'next/navigation';
import { isDiscipline, DISCIPLINE_ORDER } from '@/lib/disciplines';
import { getAllProjects } from '@/lib/content';
import { SECTIONS } from '@/data';
import { Container, Stack } from '@/components/layout';
import { SectionHero } from '@/components/section/SectionHero';
import { ProjectGrid } from '@/components/section/ProjectGrid';
import { OtherDisciplines } from '@/components/section/OtherDisciplines';

export function generateStaticParams() {
  return DISCIPLINE_ORDER.filter((d) => d !== 'blog').map((discipline) => ({ discipline }));
}

export default async function SectionPage({ params }: { params: Promise<{ discipline: string }> }) {
  const { discipline } = await params;
  if (!isDiscipline(discipline)) notFound();
  const projects = getAllProjects().filter((p) => p.discipline === discipline);
  const section = SECTIONS[discipline];
  return (
    <Container>
      <Stack>
        <SectionHero discipline={discipline} count={projects.length} intro={section.intro} tools={section.tools} />
        <ProjectGrid projects={projects} />
        <OtherDisciplines current={discipline} />
      </Stack>
    </Container>
  );
}
