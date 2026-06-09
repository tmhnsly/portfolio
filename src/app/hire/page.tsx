import type { Metadata } from 'next';
import { COPY } from '@/data';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { JsonLd } from '@/components/seo';
import { Container, Stack } from '@/components/layout';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { EmailLink } from '@/components/ui/EmailLink';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { BiDownload } from 'react-icons/bi';
import styles from './page.module.scss';

export const metadata: Metadata = pageMeta({
  title: 'Hire a Full-Stack Developer in London',
  description:
    'Hire Tom Hinsley, a London-based full-stack developer and frontend specialist in React, Next.js and TypeScript. Open to permanent roles and freelance or contract work, plus audio and video.',
  path: '/hire',
});

export default function HirePage() {
  const h = COPY.hire;
  const crumbs = [
    { name: 'Home', url: '/' },
    { name: 'Hire', url: '/hire' },
  ];
  return (
    <Container>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Stack>
        <header className={styles.hero}>
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className={styles.title}>{h.title}<span className={styles.period}>.</span></h1>
          <p className={styles.lead}>{h.lead}</p>
          <p className={styles.intro}>{h.intro}</p>
          <div className={styles.cta}>
            <EmailLink variant="primary">Get in touch</EmailLink>
            <Button variant="ghost" href="/tom-hinsley-cv.pdf" download="Tom-Hinsley-CV.pdf">
              <BiDownload aria-hidden /> Download CV
            </Button>
          </div>
        </header>

        <section className={styles.services} aria-labelledby="services-heading">
          <h2 id="services-heading" className={styles.servicesHeading}>
            {h.servicesHeading}<span className={styles.period}>.</span>
          </h2>
          <div className={styles.grid}>
            {h.services.map((s) => (
              <GlassCard key={s.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardBody}>{s.body}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className={styles.contact} aria-labelledby="hire-contact">
          <h2 id="hire-contact" className={styles.contactHeading}>{h.ctaHeading}<span className={styles.period}>.</span></h2>
          <p className={styles.contactNote}>{h.ctaNote}</p>
          <EmailLink variant="primary">Get in touch</EmailLink>
        </section>
      </Stack>
    </Container>
  );
}
