"use client";

import React from "react";
import { Section, Container, Grid } from "@/components/Layout";
import { Heading, Text, LinkText } from "@/components/Typography";
import { Button } from "@/components/Button/Button";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import s from "./Hero.module.scss";

export type HeroProps = {
  statusLabel?: string;
  headline?: React.ReactNode;
  subhead?: React.ReactNode;

  primaryCta?: { label: string; href?: string };
  secondaryCta?: { label: string; href: string };

  visual?: React.ReactNode;
  visualLabel?: string;
};

function Cta({
  label,
  href,
  kind,
}: {
  label: string;
  href?: string;
  kind: "primary" | "secondary";
}) {
  if (!href) {
    return kind === "primary" ? <Button>{label}</Button> : <span>{label}</span>;
  }

  // Primary CTA is a real button-styled link
  if (kind === "primary") {
    return (
      <Button as="a" href={href}>
        {label}
      </Button>
    );
  }

  // Secondary CTA stays as LinkText (lighter weight)
  return <LinkText href={href}>{label}</LinkText>;
}

function VisualFallback({ label }: { label: string }) {
  return (
    <div className={s.visual} aria-hidden>
      <div className={s.visualInner}>
        <div className={s.visualLabel}>{label}</div>
        <div className={s.visualFrame} />
        <div className={s.visualGlow} />
      </div>
    </div>
  );
}

export function Hero({
  statusLabel = "Open for work",
  headline = (
    <>
      Web developer crafting{" "}
      <span className={s.emphasis}>fast, focused experiences</span> for modern
      brands and products.
    </>
  ),
  subhead = (
    <>
      I help teams and founders design, build, and ship clear, performant web
      work. From clean UI systems to practical frontend engineering.
    </>
  ),
  primaryCta = { label: "View work", href: "/work" },
  secondaryCta = { label: "Get in touch", href: "/contact" },
  visual,
  visualLabel = "Featured build",
}: HeroProps) {
  return (
    <Section size={6} className={s.hero}>
      <Container>
        <div className={s.frame}>
          <Grid preset="sidebar" collapse="tablet" className={s.grid}>
            <div className={s.copy}>
              <div className={s.status} aria-label="Availability">
                <span className={s.statusDot} aria-hidden />
                <Text
                  as="p"
                  size={2}
                  weight="medium"
                  tone="soft"
                  className={s.statusLabel}
                  reveal
                  revealDelay={0}
                >
                  {statusLabel}
                </Text>
              </div>

              <Heading
                as="h1"
                size={8}
                className={s.h1}
                reveal
                revealDelay={0.12}
              >
                {headline}
              </Heading>

              <Text
                as="p"
                tone="soft"
                className={s.sub}
                reveal
                revealDelay={0.22}
              >
                {subhead}
              </Text>

              <div className={s.actions} aria-label="Primary actions">
                <Cta
                  kind="primary"
                  label={primaryCta.label}
                  href={primaryCta.href}
                />
                <Cta
                  kind="secondary"
                  label={secondaryCta.label}
                  href={secondaryCta.href}
                />
              </div>

              <div className={s.links} aria-label="Secondary links">
                <Button
                  as="a"
                  href="https://github.com/tomhinsley"
                  target="_blank"
                  rel="noreferrer"
                  variant="glass"
                  size="sm"
                >
                  <FaGithub className={s.linkIcon} aria-hidden />
                  GitHub
                </Button>
                <Button
                  as="a"
                  href="https://www.linkedin.com/in/tomhinsley"
                  target="_blank"
                  rel="noreferrer"
                  variant="glass"
                  size="sm"
                >
                  <FaLinkedinIn className={s.linkIcon} aria-hidden />
                  LinkedIn
                </Button>
                <Button
                  as="a"
                  href="https://www.youtube.com/@tomhinsley"
                  target="_blank"
                  rel="noreferrer"
                  variant="glass"
                  size="sm"
                >
                  <FaYoutube className={s.linkIcon} aria-hidden />
                  YouTube
                </Button>
                <Button
                  as="a"
                  href="mailto:hello@tomhinsley.com"
                  variant="glass"
                  size="sm"
                >
                  <FaEnvelope className={s.linkIcon} aria-hidden />
                  Email
                </Button>
              </div>
            </div>

            {visual ?? <VisualFallback label={visualLabel} />}
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
