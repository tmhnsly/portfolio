import type { Metadata } from 'next';
import Link from 'next/link';
import { COPY } from '@/data';
import { DISCIPLINES } from '@/lib/disciplines';
import { pageMeta } from '@/lib/metadata';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/structured-data';
import { JsonLd } from '@/components/seo';
import { Container, Stack } from '@/components/layout';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { EmailLink } from '@/components/ui/EmailLink';
import { Button } from '@/components/ui/Button';
import { PixelMark } from '@/components/ui/PixelMark';
import { LinkArrow } from '@/components/ui/LinkArrow';
import { CTABanner } from '@/components/ui/CTABanner';
import { FAQ } from '@/components/about/FAQ';
import { Entrance, EntranceItem, EntranceTitle } from '@/components/motion/Entrance';
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
      <JsonLd data={faqJsonLd(COPY.about.faq)} />
      <Stack>
        <Entrance className={styles.hero}>
          <EntranceItem i={0}>
            <Eyebrow>{h.eyebrow}</Eyebrow>
          </EntranceItem>
          <EntranceTitle className={styles.title} title={h.title} period />
          <EntranceItem i={1}>
            <p className={styles.lead}>{h.lead}</p>
          </EntranceItem>
          <EntranceItem i={2}>
            <p className={styles.intro}>{h.intro}</p>
          </EntranceItem>
          <EntranceItem i={3} className={styles.cta}>
            <EmailLink variant="primary" subject="Work enquiry">Get in touch</EmailLink>
            <Button variant="ghost" href="/tom-hinsley-cv.pdf" download="Tom-Hinsley-CV.pdf">
              <BiDownload aria-hidden /> Download CV
            </Button>
          </EntranceItem>
          <EntranceItem i={4} className={styles.workedWith}>
            <span className={styles.workedLabel}>{h.workedWithLabel}</span>
            {h.workedWith.map((c) => (
              <span key={c} className={styles.workedItem}>{c}</span>
            ))}
          </EntranceItem>
        </Entrance>

        <section className={styles.services} aria-labelledby="services-heading">
          <div className={styles.servicesHead}>
            <Eyebrow>{h.servicesEyebrow}</Eyebrow>
            <h2 id="services-heading" className={styles.servicesHeading}>
              {h.servicesHeading}<span className={styles.period}>.</span>
            </h2>
          </div>
          <div className={styles.grid}>
            {h.services.map((s) => {
              const d = DISCIPLINES[s.discipline];
              return (
                <Link
                  key={s.discipline}
                  href={d.route}
                  className={styles.card}
                  style={{ ['--accent']: d.color, ['--accent-ink']: d.ink } as React.CSSProperties}
                  aria-label={`${s.title}: ${s.linkLabel}`}
                >
                  <span className={styles.cardBar} aria-hidden />
                  <span className={styles.mark}>
                    <PixelMark icon={s.discipline} accent="var(--accent)" color="var(--text-soft)" size={48} />
                  </span>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardBody}>{s.body}</p>
                  <span className={styles.cardLink}>{s.linkLabel} <LinkArrow inline /></span>
                </Link>
              );
            })}
          </div>
        </section>

        <FAQ />

        <CTABanner
          eyebrowLabel={h.ctaEyebrow}
          heading={h.ctaHeading}
          headingSoft={h.ctaHeadingSoft}
          subject="Work enquiry"
          note={h.ctaNote}
        />
      </Stack>
    </Container>
  );
}
