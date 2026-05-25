import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';
import { EmailLink } from '@/components/ui/EmailLink';
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
            <EmailLink variant="primary" showArrow inline />
            <span className={styles.note}>{COPY.about.ctaNote}</span>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
