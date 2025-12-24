import type { HeroProps } from "@/sections/Hero/Hero";

export const HOME_HERO: HeroProps = {
  statusLabel: "Open for work",
  headline: (
    <>
      Simple, fast, and clear.
      <br />
      Web work that feels easy.
    </>
  ),
  subhead: (
    <>
      Web developer offering design-aware builds, clean UI systems, and
      performance-minded engineering.
    </>
  ),
  primaryCta: { label: "View work", href: "/work" },
  secondaryCta: { label: "Get in touch", href: "/contact" },
  visualLabel: "Latest build",
};
