import { Container, Stack } from '@/components/layout';
import { AboutHero } from '@/components/about/AboutHero';
import { Intro } from '@/components/about/Intro';
import { Currently } from '@/components/about/Currently';
import { Timeline } from '@/components/about/Timeline';
import { Skills } from '@/components/about/Skills';
import { ContactCTA } from '@/components/about/ContactCTA';
import { TIMELINE, SKILLS } from '@/data';

export default function AboutPage() {
  return (
    <Container>
      <Stack>
        <AboutHero />
        <Intro />
        <Currently />
        <Timeline entries={TIMELINE} />
        <Skills skills={SKILLS} />
        <ContactCTA />
      </Stack>
    </Container>
  );
}
