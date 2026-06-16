import type { Metadata } from 'next';
import { COPY, TIMELINE } from '@/data';
import { pageMeta } from '@/lib/metadata';
import { faqJsonLd } from '@/lib/structured-data';
import { JsonLd } from '@/components/seo';
import { Container, Stack } from '@/components/layout';
import { AboutHero } from '@/components/about/AboutHero';
import { Intro } from '@/components/about/Intro';
import { Currently } from '@/components/about/Currently';
import { Timeline } from '@/components/about/Timeline';
import { Help } from '@/components/about/Help';
import { FAQ } from '@/components/about/FAQ';
import { ContactCTA } from '@/components/about/ContactCTA';

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
        <Help />
        <FAQ />
        <ContactCTA />
      </Stack>
    </Container>
  );
}
