import type { Metadata } from 'next';
import { Container, Stack } from '@/components/layout';
import { AboutHero } from '@/components/about/AboutHero';
import { Intro } from '@/components/about/Intro';
import { Currently } from '@/components/about/Currently';
import { Timeline } from '@/components/about/Timeline';
import { Skills } from '@/components/about/Skills';
import { FAQ } from '@/components/about/FAQ';
import { ContactCTA } from '@/components/about/ContactCTA';
import { TIMELINE, COPY } from '@/data';
import { getSkills } from '@/data/skills';
import { pageMeta } from '@/lib/metadata';
import { faqJsonLd } from '@/lib/structured-data';
import { JsonLd } from '@/components/seo';

export const metadata: Metadata = pageMeta({
  title: 'About',
  description: 'Full-stack developer and frontend specialist in London with a sound-design background. Open to roles and freelance, working across web, audio and video.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <Container>
      <JsonLd data={faqJsonLd(COPY.about.faq)} />
      <Stack>
        <AboutHero />
        <Intro />
        <Currently />
        <Timeline entries={TIMELINE} />
        <Skills skills={getSkills()} />
        <FAQ />
        <ContactCTA />
      </Stack>
    </Container>
  );
}
