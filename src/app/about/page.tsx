import { Page, Nav, Footer, Container, Stack } from '@/components/layout';
import { AboutHero } from '@/components/about/AboutHero';
import { Intro } from '@/components/about/Intro';
import { Timeline } from '@/components/about/Timeline';
import { Skills } from '@/components/about/Skills';
import { ContactCTA } from '@/components/about/ContactCTA';
import { TIMELINE, SKILLS } from '@/data';

export default function AboutPage() {
  return (
    <Page>
      <Nav active="about" />
      <Container>
        <Stack>
          <AboutHero />
          <Intro />
          <Timeline entries={TIMELINE} />
          <Skills skills={SKILLS} />
          <ContactCTA />
        </Stack>
      </Container>
      <Footer />
    </Page>
  );
}
