# Two reveal-on-scroll mechanisms (Motion and CSS) are kept separate

The site reveals elements on scroll two ways, on purpose:

- **`Reveal`** (`components/motion/Reveal`) wraps content in a `motion.div` with `whileInView` + `revealVariants`, firing at ~20% visibility (`amount: 0.2`). It's the right tool for ordinary content blocks that just need a JS-animated fade-up.
- **`useReveal`** (`components/project-thumbs/useReveal`), via the **`RevealThumb`** wrapper, latches a custom `IntersectionObserver` and toggles an `.inview` class. The bespoke project thumbnails author their entrance as SCSS keyframes that hang off that class, so the reveal must be CSS-class-driven, not Motion-driven.

A future architecture review will be tempted to "unify these onto one reveal seam." **Don't** — it's a net negative:

- Routing `Reveal` through `useReveal` would hand-roll viewport detection that Motion's `whileInView` already does well, and the two triggers differ (`whileInView`'s `amount: 0.2` vs the hook's threshold-0). Matching the 20% trigger means threading a threshold through `useInView`/`useReveal` just to reproduce what Motion gives for free, and getting it wrong makes reveals fire too early.
- Routing the thumbs through `Reveal` (Motion) would mean rewriting every bespoke thumb's SCSS-keyframe entrance as Motion variants — a large, behaviour-risky change for no gain.

They are two correct tools for two different jobs (Motion-animated wrappers vs SCSS-authored thumb entrances). The division of labour — including `Entrance` (first-load) and `Marquee` (continuous) — is documented under **Motion primitives** in `CONTEXT.md`. Keep both; don't merge.
