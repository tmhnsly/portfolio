import { notFound } from 'next/navigation';
import { getAllProjects, getProject, projectNeighbours, relatedProjects } from '@/lib/content';
import { Container, Stack } from '@/components/layout';
import { ProjectHero } from '@/components/project/ProjectHero';
import { MediaHero } from '@/components/project/MediaHero';
import { ProjectBody } from '@/components/project/ProjectBody';
import { PrevNext } from '@/components/project/PrevNext';
import { RelatedWork } from '@/components/project/RelatedWork';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ discipline: p.discipline, slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ discipline: string; slug: string }> }) {
  const { discipline, slug } = await params;
  const project = getProject(slug);
  if (!project || project.discipline !== discipline) notFound();

  const { prev, next } = projectNeighbours(slug);
  const related = relatedProjects(slug);

  return (
    <Container>
      <Stack>
        <ProjectHero project={project} />
        <MediaHero project={project} />
        <ProjectBody project={project} />
        <PrevNext discipline={project.discipline} prev={prev} next={next} />
        <RelatedWork projects={related} />
      </Stack>
    </Container>
  );
}
