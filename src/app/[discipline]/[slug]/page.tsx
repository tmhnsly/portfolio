import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectInDiscipline, projectNeighbours, relatedProjects } from '@/lib/content';
import { projectHref } from '@/lib/routes';
import { projectHead } from '@/lib/page-head';
import { projectVideoJsonLd, projectCreativeWorkJsonLd, breadcrumbJsonLd, projectCrumbs } from '@/lib/structured-data';
import { JsonLd } from '@/components/seo';
import { Container, Stack } from '@/components/layout';
import { ProjectHero } from '@/components/project/ProjectHero';
import { MediaHero } from '@/components/project/MediaHero';
import { ProjectBody } from '@/components/project/ProjectBody';
import { PrevNext } from '@/components/ui/PrevNext';
import { RelatedWork } from '@/components/project/RelatedWork';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ discipline: p.discipline, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ discipline: string; slug: string }> }): Promise<Metadata> {
  const { discipline, slug } = await params;
  const project = getProjectInDiscipline(discipline, slug);
  if (!project) return {};
  return projectHead(project).meta;
}

export default async function ProjectPage({ params }: { params: Promise<{ discipline: string; slug: string }> }) {
  const { discipline, slug } = await params;
  const project = getProjectInDiscipline(discipline, slug);
  if (!project) notFound();

  const { prev, next } = projectNeighbours(slug);
  const related = relatedProjects(slug);
  const videoLd = projectVideoJsonLd(project);

  return (
    <Container>
      {videoLd && <JsonLd data={videoLd} />}
      <JsonLd data={projectCreativeWorkJsonLd(project)} />
      <JsonLd data={breadcrumbJsonLd(projectCrumbs(project))} />
      <Stack>
        <ProjectHero project={project} />
        <MediaHero project={project} />
        <ProjectBody project={project} />
        <PrevNext
          ariaLabel="Project navigation"
          prevLabel={`Previous in /${project.discipline}`}
          nextLabel={`Next in /${project.discipline}`}
          prev={prev && { href: projectHref(project.discipline, prev.slug), title: prev.title }}
          next={next && { href: projectHref(project.discipline, next.slug), title: next.title }}
        />
        <RelatedWork projects={related} />
      </Stack>
    </Container>
  );
}
