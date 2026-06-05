import type { Discipline } from '@/types';
import { SECTIONS } from '@/data';
import { CTABanner } from '@/components/ui/CTABanner';

/**
 * Themed "get in touch" CTA at the bottom of a discipline page. The copy comes
 * from SECTIONS[discipline].cta; the accent themes itself to the page zone
 * (--accent is already the discipline hue on its route). Presentation is the
 * shared CTABanner.
 */
export function SectionCTA({ discipline }: { discipline: Discipline }) {
  const cta = SECTIONS[discipline].cta;
  if (!cta) return null;
  return (
    <CTABanner
      eyebrowLabel="Get in touch"
      eyebrowDot
      heading={cta.heading}
      subject={cta.subject}
      note={cta.note}
    />
  );
}
