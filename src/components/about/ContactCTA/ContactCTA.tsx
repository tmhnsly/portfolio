import { SITE, COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import styles from './ContactCTA.module.scss';

export function ContactCTA() {
  return (
    <section className={styles.section}>
      <GlassCard>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Eyebrow>{COPY.about.ctaEyebrow}</Eyebrow>
            <h2 className={styles.heading}>
              {COPY.about.ctaHeading}<br />
              <span className={styles.soft}>{COPY.about.ctaHeadingSoft}</span>
            </h2>
          </div>
          <div className={styles.right}>
            <Button variant="primary" href={`mailto:${SITE.email}`}>
              {SITE.email} →
            </Button>
            <span className={styles.note}>{COPY.about.ctaNote}</span>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
