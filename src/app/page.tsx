import { Page, Nav, Footer, Container } from '@/components/layout';
import { Hero } from '@/components/home/Hero';
import { DisciplineScroller } from '@/components/home/DisciplineScroller';
import { RecentWork } from '@/components/home/RecentWork';
import { getAllProjects } from '@/lib/content';

export default function Home() {
  const projects = getAllProjects();
  const deck = projects.slice(0, 4);
  return (
    <Page>
      <Nav />
      <Container>
        <Hero featured={deck} />
        <DisciplineScroller />
        <RecentWork projects={projects} />
      </Container>
      <Footer />
    </Page>
  );
}
