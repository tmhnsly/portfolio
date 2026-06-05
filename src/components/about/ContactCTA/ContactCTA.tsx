import { COPY } from '@/data';
import { CTABanner } from '@/components/ui/CTABanner';

export function ContactCTA() {
  return (
    <CTABanner
      eyebrowLabel={COPY.about.ctaEyebrow}
      heading={COPY.about.ctaHeading}
      headingSoft={COPY.about.ctaHeadingSoft}
      note={COPY.about.ctaNote}
    />
  );
}
