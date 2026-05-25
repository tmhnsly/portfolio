import type { Discipline } from '@/types';
import { SECTIONS } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlassCard } from '@/components/ui/GlassCard';
import { EmailLink } from '@/components/ui/EmailLink';
import styles from './SectionCTA.module.scss';

/**
 * Themed "get in touch" CTA at the bottom of a discipline page. The copy comes
 * from SECTIONS[discipline].cta; the accent themes itself to the page zone
 * (--accent is already the discipline hue on its route). Mirrors ContactCTA.
 */
export function SectionCTA({ discipline }: { discipline: Discipline }) {
  const cta = SECTIONS[discipline].cta;
  if (!cta) return null;
  return (
    <section className={styles.section}>
      <GlassCard>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Eyebrow withDot>Get in touch</Eyebrow>
            <h2 className={styles.heading}>{cta.heading}</h2>
          </div>
          <div className={styles.right}>
            <EmailLink variant="primary" subject={cta.subject} showArrow inline />
            {cta.note && <span className={styles.note}>{cta.note}</span>}
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
