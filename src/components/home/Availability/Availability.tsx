import Link from 'next/link';
import { BiDownload } from 'react-icons/bi';
import { COPY } from '@/data';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { EmailLink } from '@/components/ui/EmailLink';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { LinkArrow } from '@/components/ui/LinkArrow';
import styles from './Availability.module.scss';

/**
 * Homepage "open to work" block — the one visible hire signal, doubling as a
 * strong on-page keyword cue. The subtle `more` link is the only internal route
 * to /hire (kept out of the nav on purpose), so that page isn't orphaned.
 */
export function Availability() {
  const a = COPY.home.availability;
  return (
    <section aria-labelledby="availability-heading">
      <GlassCard className={styles.card}>
        <Eyebrow>{a.eyebrow}</Eyebrow>
        <h2 id="availability-heading" className={styles.heading}>
          {a.heading}<span className={styles.period}>.</span>
        </h2>
        <p className={styles.body}>{a.body}</p>
        <div className={styles.cta}>
          <EmailLink variant="primary">Get in touch</EmailLink>
          <Button variant="ghost" href="/tom-hinsley-cv.pdf" download="Tom-Hinsley-CV.pdf">
            <BiDownload aria-hidden /> Download CV
          </Button>
          <Link href="/hire" className={styles.more}>{a.more} <LinkArrow inline /></Link>
        </div>
      </GlassCard>
    </section>
  );
}
