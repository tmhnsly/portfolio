import { SITE } from '@/data';
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
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className={styles.heading}>
              Working on something<br />
              <span className={styles.soft}>I should know about?</span>
            </h2>
          </div>
          <div className={styles.right}>
            <Button variant="primary" href={`mailto:${SITE.email}`}>
              {SITE.email} →
            </Button>
            <span className={styles.note}>usually replies within a day or two.</span>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
