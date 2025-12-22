import s from "./page.module.scss";

import {
  Page,
  Section,
  Container,
  Breakout,
  Grid,
  Bento,
  BentoItem,
} from "@/components/Layout";
import { Heading, Text, LinkText } from "@/components/Typography";

import { Button } from "@/components/Button/Button";

export default function Home() {
  return (
    <Page className={s.page}>
      {/* HERO */}
      <Section size={4} className={s.hero}>
        <Container>
          <Grid preset="sidebar" collapse="tablet" className={s.heroGrid}>
            <div className={s.heroCopy}>
              <Text as="p" tone="soft" className={s.eyebrow}>
                Tom Hinsley
              </Text>

              <Heading as="h1" size={8} className={s.heroTitle}>
                React-focused web developer building fast, modern sites.
              </Heading>

              <Text as="p" tone="soft" className={s.heroSubtitle}>
                I ship clean UI with React + TypeScript and a small set of
                durable primitives. Calm design, sharp performance, and systems
                that don’t rot.
              </Text>

              <div className={s.heroActions}>
                <Button>View work</Button>
                <Button>Get in touch</Button>
              </div>

              <div className={s.heroLinks}>
                <LinkText href="/work">See projects</LinkText>
                <LinkText href="/about">About</LinkText>
                <LinkText href="/contact">Contact</LinkText>
              </div>
            </div>

            <aside className={s.heroCard} aria-label="Highlights">
              <div className={s.cardTop}>
                <Text as="p" size={2} tone="soft" className={s.cardPill}>
                  Available for select projects
                </Text>
                <span className={s.pulseDot} />
              </div>

              <Heading as="h2" size={6} className={s.cardTitle}>
                Craft + speed
              </Heading>

              <Text as="p" tone="soft" className={s.cardBody}>
                Strong defaults, minimal props, and predictable layout rules.
              </Text>

              <div className={s.cardRows}>
                <div className={s.row}>
                  <Text as="p" size={2} tone="soft" className={s.rowLabel}>
                    Stack
                  </Text>
                  <Text as="p" size={2} className={s.rowValue}>
                    React • Next.js • TypeScript
                  </Text>
                </div>

                <div className={s.row}>
                  <Text as="p" size={2} tone="soft" className={s.rowLabel}>
                    UI
                  </Text>
                  <Text as="p" size={2} className={s.rowValue}>
                    Tokens • SCSS • Radix colors
                  </Text>
                </div>

                <div className={s.row}>
                  <Text as="p" size={2} tone="soft" className={s.rowLabel}>
                    Care
                  </Text>
                  <Text as="p" size={2} className={s.rowValue}>
                    Accessibility • perf • polish
                  </Text>
                </div>
              </div>
            </aside>
          </Grid>
        </Container>

        {/* Full-width accent band (tests Breakout) */}
        <Breakout keepGutter className={s.heroBand}>
          <div className={s.heroBandInner}>
            <Text as="p" size={2} tone="soft">
              Building a layout kit: <span className={s.mono}>Page</span>,{" "}
              <span className={s.mono}>Section</span>,{" "}
              <span className={s.mono}>Container</span>,{" "}
              <span className={s.mono}>Grid</span> — consistent gutters +
              motion-ready grids.
            </Text>
          </div>
        </Breakout>
      </Section>

      {/* STATS / VALUE (tests Grid motion) */}
      <Section size={3} className={s.section}>
        <Container>
          <div className={s.sectionHeader}>
            <Heading as="h2" size={6}>
              What you’re getting
            </Heading>
            <Text as="p" tone="soft">
              A small system with strong defaults — responsive out of the box.
            </Text>
          </div>

          <Grid
            cols={3}
            collapse="tablet"
            motion="stagger"
            className={s.cardsGrid}
          >
            <div className={s.card}>
              <Heading as="h3" size={5}>
                Consistent layout
              </Heading>
              <Text as="p" tone="soft">
                Containers align across the site. Breakouts go edge-to-edge
                without breaking gutters.
              </Text>
            </div>

            <div className={s.card}>
              <Heading as="h3" size={5}>
                Practical motion
              </Heading>
              <Text as="p" tone="soft">
                Staggered grid reveals only where it adds value — no global
                animation spam.
              </Text>
            </div>

            <div className={s.card}>
              <Heading as="h3" size={5}>
                Durable typography
              </Heading>
              <Text as="p" tone="soft">
                Text + Heading components with consistent sizing, wrapping,
                tone, and alignment.
              </Text>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* BENTO FEATURED (tests Bento spans/heights + motion) */}
      <Section size={3} className={s.sectionAlt} tone="muted">
        <Container>
          <div className={s.sectionHeader}>
            <Heading as="h2" size={6}>
              Featured work
            </Heading>
            <Text as="p" tone="soft">
              Bento layout stress-test: spans, heights, and responsive collapse.
            </Text>
          </div>

          <Bento motion="stagger" className={s.bento}>
            <BentoItem span={8} height="lg" className={s.tile}>
              <div className={s.tileTop}>
                <Text as="p" size={2} tone="soft" className={s.tileKicker}>
                  Case study
                </Text>
                <LinkText href="/work">Open</LinkText>
              </div>
              <Heading as="h3" size={6} className={s.tileTitle}>
                Chork
              </Heading>
              <Text as="p" tone="soft" className={s.tileBody}>
                A small design system + app shell with clean layout primitives.
              </Text>
            </BentoItem>

            <BentoItem span={4} height="lg" className={s.tile}>
              <Text as="p" size={2} tone="soft" className={s.tileKicker}>
                Website
              </Text>
              <Heading as="h3" size={6} className={s.tileTitle}>
                mandydennis.art
              </Heading>
              <Text as="p" tone="soft" className={s.tileBody}>
                Masonry gallery + calm presentation for paintings.
              </Text>
            </BentoItem>

            <BentoItem span={6} height="md" className={s.tile}>
              <Text as="p" size={2} tone="soft" className={s.tileKicker}>
                System
              </Text>
              <Heading as="h3" size={6} className={s.tileTitle}>
                Layout kit
              </Heading>
              <Text as="p" tone="soft" className={s.tileBody}>
                Page/Section/Container + Grid presets + optional motion.
              </Text>
            </BentoItem>

            <BentoItem span={6} height="md" className={s.tile}>
              <Text as="p" size={2} tone="soft" className={s.tileKicker}>
                Motion
              </Text>
              <Heading as="h3" size={6} className={s.tileTitle}>
                Micro-interactions
              </Heading>
              <Text as="p" tone="soft" className={s.tileBody}>
                Reveal and stagger that feel modern — not “portfolio template”.
              </Text>
            </BentoItem>
          </Bento>
        </Container>
      </Section>

      {/* PROCESS (tests Grid preset="feature") */}
      <Section size={3} className={s.section}>
        <Container>
          <div className={s.sectionHeader}>
            <Heading as="h2" size={6}>
              Process
            </Heading>
            <Text as="p" tone="soft">
              Quick steps that keep projects moving.
            </Text>
          </div>

          <Grid
            preset="feature"
            collapse="tablet"
            motion="stagger"
            className={s.processGrid}
          >
            <div className={s.processTile}>
              <Heading as="h3" size={6}>
                01 — Align
              </Heading>
              <Text as="p" tone="soft">
                Define goals, constraints, content, and the “done” bar. Then
                choose the smallest system that works.
              </Text>
            </div>

            <div className={s.processTile}>
              <Heading as="h3" size={6}>
                02 — Prototype
              </Heading>
              <Text as="p" tone="soft">
                Build the layout skeleton first: sections, containers, and grid
                rhythms. No paint too early.
              </Text>
            </div>

            <div className={s.processTile}>
              <Heading as="h3" size={6}>
                03 — Ship
              </Heading>
              <Text as="p" tone="soft">
                Tighten responsiveness, a11y, and performance. Add motion only
                where it earns its keep.
              </Text>
            </div>

            <div className={s.processTile}>
              <Heading as="h3" size={6}>
                04 — Maintain
              </Heading>
              <Text as="p" tone="soft">
                Keep primitives boring. Let surfaces/cards evolve without
                breaking the layout contract.
              </Text>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* CTA (tests Breakout + container alignment) */}
      <Section size={3} className={s.cta}>
        <Breakout keepGutter className={s.ctaBand}>
          <Container>
            <div className={s.ctaInner}>
              <div className={s.ctaCopy}>
                <Heading as="h2" size={6}>
                  Want a site that feels expensive?
                </Heading>
                <Text as="p" tone="soft">
                  Let’s build a clean, fast front end with a system you can
                  actually maintain.
                </Text>
              </div>

              <div className={s.ctaActions}>
                <Button>Contact</Button>
                <LinkText href="/work">Browse work</LinkText>
              </div>
            </div>
          </Container>
        </Breakout>
      </Section>
    </Page>
  );
}
