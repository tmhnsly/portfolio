import Link from 'next/link';
import { Page, Nav, Footer, Container, Stack } from '@/components/layout';
import { DISCIPLINE_ORDER, DISCIPLINES } from '@/lib/disciplines';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { SITE, COPY } from '@/data';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <Page>
      <Nav />
      <Container>
        <Stack>
        <section className={styles.wrap}>
          <Eyebrow withDot>{COPY.notFound.eyebrow}</Eyebrow>
          <h1 className={styles.code}>404<span className={styles.period}>.</span></h1>
          <div className={styles.urlbar} aria-hidden>
            {COPY.notFound.urlHost}<span className={styles.path}>{COPY.notFound.urlPath}</span>
          </div>
          <p className={styles.lead}>{COPY.notFound.lead}</p>
          <div className={styles.grid}>
            {DISCIPLINE_ORDER.map((slug) => {
              const d = DISCIPLINES[slug];
              return (
                <Link key={slug} href={d.route} className={styles.cardLink} aria-label={d.route}>
                  <GlassCard soft className={styles.card}>
                    <span className={styles.dot} style={{ background: d.color }} />
                    <span className={styles.slug}>{d.route}</span>
                    <span className={styles.arrow} aria-hidden>→</span>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
          <div className={styles.cta}>
            <span className={styles.ctaText}>{COPY.notFound.cta}</span>
            <Button variant="primary" href={`mailto:${SITE.email}`}>{SITE.email} →</Button>
          </div>
        </section>
        </Stack>
      </Container>
      <Footer />
    </Page>
  );
}
