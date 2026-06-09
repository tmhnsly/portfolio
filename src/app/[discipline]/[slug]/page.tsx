import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectInDiscipline, projectNeighbours, relatedProjects } from '@/lib/content';
import { DISCIPLINES } from '@/lib/disciplines';
import { projectHref } from '@/lib/routes';
import { pageMeta } from '@/lib/metadata';
import { projectVideoJsonLd, projectCreativeWorkJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';
import { JsonLd } from '@/components/seo';
import { Container, Stack } from '@/components/layout';
import { ProjectHero } from '@/components/project/ProjectHero';
import { MediaHero } from '@/components/project/MediaHero';
import { ProjectBody } from '@/components/project/ProjectBody';
import { PrevNext } from '@/components/project/PrevNext';
import { RelatedWork } from '@/components/project/RelatedWork';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ discipline: p.discipline, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ discipline: string; slug: string }> }): Promise<Metadata> {
  const { discipline, slug } = await params;
  const project = getProjectInDiscipline(discipline, slug);
  if (!project) return {};
  const description = project.desc ?? `${DISCIPLINES[project.discipline].label} work by Tom Hinsley.`;
  return pageMeta({ title: project.title, description, path: projectHref(project.discipline, slug), type: 'article' });
}

export default async function ProjectPage({ params }: { params: Promise<{ discipline: string; slug: string }> }) {
  const { discipline, slug } = await params;
  const project = getProjectInDiscipline(discipline, slug);
  if (!project) notFound();

  const { prev, next } = projectNeighbours(slug);
  const related = relatedProjects(slug);
  const videoLd = projectVideoJsonLd(project);
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: DISCIPLINES[project.discipline].label, url: DISCIPLINES[project.discipline].route },
    { name: project.title, url: projectHref(project.discipline, slug) },
  ];

  return (
    <Container>
      {videoLd && <JsonLd data={videoLd} />}
      <JsonLd data={projectCreativeWorkJsonLd(project)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
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
