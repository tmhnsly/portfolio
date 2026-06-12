import { Container, Stack } from '@/components/layout';
import { Hero } from '@/components/home/Hero';
import { DisciplineScroller } from '@/components/home/DisciplineScroller';
import { RecentWork } from '@/components/home/RecentWork';
import { Availability } from '@/components/home/Availability';
import { getAllProjects, featuredProjects } from '@/lib/content';
import { BloomTuner } from '@/components/dev/BloomTuner'; // DEV-ONLY tuner — remove before merge

export default function Home() {
  const projects = getAllProjects();
  const deck = featuredProjects();
  return (
    <>
      <Container>
        <Stack>
          <Hero featured={deck} />
          <DisciplineScroller />
          <RecentWork projects={projects} />
          <Availability />
        </Stack>
      </Container>
      <BloomTuner />
    </>
  );
}
