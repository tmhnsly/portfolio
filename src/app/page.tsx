import { Container, Stack } from '@/components/layout';
import { Hero } from '@/components/home/Hero';
import { DisciplineScroller } from '@/components/home/DisciplineScroller';
import { RecentWork } from '@/components/home/RecentWork';
import { Availability } from '@/components/home/Availability';
import { getAllProjects, featuredProjects } from '@/lib/content';

export default function Home() {
  // The carousel is the hand-picked best (DECK_LEAD); "Recent work" is simply the
  // newest projects, newest first, even if some are also in the carousel.
  const deck = featuredProjects();
  const recent = getAllProjects();
  return (
    <Container>
      <Stack>
        <Hero featured={deck} />
        <DisciplineScroller />
        <RecentWork projects={recent} />
        <Availability />
      </Stack>
    </Container>
  );
}
