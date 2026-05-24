import { notFound } from 'next/navigation';
import { getAllProjects, getProject } from '@/lib/content';
import { Container, Stack } from '@/components/layout';
import { ProjectHero } from '@/components/project/ProjectHero';
import { ProjectEmbed } from '@/components/project/ProjectEmbed';
import { ProjectBody } from '@/components/project/ProjectBody';
import { Gallery } from '@/components/project/Gallery';
import { PrevNext } from '@/components/project/PrevNext';
import { RelatedWork } from '@/components/project/RelatedWork';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ discipline: p.discipline, slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ discipline: string; slug: string }> }) {
  const { discipline, slug } = await params;
  const project = getProject(slug);
  if (!project || project.discipline !== discipline) notFound();

  const inDiscipline = getAllProjects().filter((p) => p.discipline === project.discipline);
  const i = inDiscipline.findIndex((p) => p.slug === project.slug);
  const prev = i > 0 ? inDiscipline[i - 1] : undefined;
  const next = i >= 0 && i < inDiscipline.length - 1 ? inDiscipline[i + 1] : undefined;
  const related = getAllProjects().filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <Container>
      <Stack>
        <ProjectHero project={project} />
        <ProjectEmbed project={project} />
        <ProjectBody project={project} />
        <Gallery frames={project.gallery} />
        <PrevNext discipline={project.discipline} prev={prev} next={next} />
        <RelatedWork projects={related} />
      </Stack>
    </Container>
  );
}
