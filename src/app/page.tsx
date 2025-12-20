import s from "./page.module.scss";
import {
  Text,
  Heading,
  Blockquote,
  Quote,
  Em,
  Kbd,
  Code,
  Strong,
} from "@/components/Typography";
import { Button } from "@/components/Button/ Button";

export default function Home() {
  return (
    <main className={s.page}>
      {/* Hero */}
      <section>
        <Heading as="h1" size={8}>
          Hero
        </Heading>
        <Button>Click me</Button>
      </section>

      {/* Intro */}
      <section>
        <Heading as="h1" size={8}>
          Hello, I’m Tom
        </Heading>

        <Text as="p" tone="soft">
          Front-end engineer, designer, and occasional tinkerer.
        </Text>

        <Text as="p">
          I like building thoughtful interfaces that feel calm, intentional, and
          fast. If you’d like to see what I’m working on, click{" "}
          <a href="/work">here</a>.
        </Text>

        <Heading as="h2" size={6}>
          Philosophy
        </Heading>

        <Blockquote>
          <Quote>Good design is as little design as possible.</Quote>
        </Blockquote>

        <Text as="p">
          This site is built with a small design system inspired by{" "}
          <Em>Radix UI</Em>, but tailored for long-term maintainability.
        </Text>

        <Text as="p">
          Use <Kbd>Cmd</Kbd> + <Kbd>K</Kbd> to open the command menu.
        </Text>

        <Text as="p">
          Run <Code>yarn dev</Code> to start the local server.
        </Text>

        <Text as="p">
          <Strong>Note:</Strong> Everything here is deliberately simple.
        </Text>
      </section>

      {/* Video / next section */}
      <section>
        <Heading as="h2" size={6}>
          Video
        </Heading>
      </section>
    </main>
  );
}
