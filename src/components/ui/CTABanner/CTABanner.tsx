import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';
import { EmailLink } from '@/components/ui/EmailLink';
import styles from './CTABanner.module.scss';

/**
 * The "get in touch" banner shared by the About page (ContactCTA) and the
 * discipline pages (SectionCTA): a GlassCard split into an eyebrow + heading on
 * the left and the EmailLink + note on the right. The accent comes from the
 * current Zone, so the same banner themes itself per route. `headingSoft` adds a
 * second, muted heading line; pass a `subject` to prefill the mailto.
 */
export function CTABanner({ eyebrowLabel, eyebrowDot = false, heading, headingSoft, subject, note }: {
  eyebrowLabel: string;
  eyebrowDot?: boolean;
  heading: string;
  headingSoft?: string;
  subject?: string;
  note?: string;
}) {
  return (
    <section className={styles.section}>
      <GlassCard>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Eyebrow withDot={eyebrowDot}>{eyebrowLabel}</Eyebrow>
            <h2 className={styles.heading}>
              {heading}
              {headingSoft && <><br /><span className={styles.soft}>{headingSoft}</span></>}
            </h2>
          </div>
          <div className={styles.right}>
            <EmailLink variant="primary" subject={subject} showArrow inline />
            {note && <span className={styles.note}>{note}</span>}
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
