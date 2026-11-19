import { Container, Stack } from '@/components/layout';
import { Hero } from '@/components/home/Hero';
import { DisciplineScroller } from '@/components/home/DisciplineScroller';
import { RecentWork } from '@/components/home/RecentWork';
import { Availability } from '@/components/home/Availability';
import { getAllProjects, featuredProjects } from '@/lib/content';

export default function Home() {
  const deck = featuredProjects();
  // "Recent work" is everything else, newest first: the carousel shows the best
  // pieces, this shows what's been shipped lately, and nothing appears in both.
  const inDeck = new Set(deck.map((p) => p.slug));
  const recent = getAllProjects().filter((p) => !inDeck.has(p.slug));
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
