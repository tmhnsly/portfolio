import type { Metadata } from 'next';
import { Container, Stack } from '@/components/layout';
import { AboutHero } from '@/components/about/AboutHero';
import { Intro } from '@/components/about/Intro';
import { Currently } from '@/components/about/Currently';
import { Timeline } from '@/components/about/Timeline';
import { Skills } from '@/components/about/Skills';
import { ContactCTA } from '@/components/about/ContactCTA';
import { TIMELINE } from '@/data';
import { getSkills } from '@/data/skills';
import { pageMeta } from '@/lib/metadata';

export const metadata: Metadata = pageMeta({
  title: 'About',
  description: 'Full-stack developer and frontend specialist in London with a sound-design background. Open to roles and freelance, working across web, audio and video.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <Container>
      <Stack>
        <AboutHero />
        <Intro />
        <Currently />
        <Timeline entries={TIMELINE} />
        <Skills skills={getSkills()} />
        <ContactCTA />
      </Stack>
    </Container>
  );
}
