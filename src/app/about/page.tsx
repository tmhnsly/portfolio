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

export const metadata: Metadata = {
  title: 'About · Tom Hinsley',
  description: 'Frontend developer in London with a sound-design background. Code, with side practices in music, sound, photography and film.',
};

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
