---
title: Raditz
desc: An exploration of how an accessible, themeable React component library could work
discipline: code
date: "2026-06-01"
tags: ["React", "TypeScript", "Storybook", "Accessibility", "Open source"]
role: Design + engineering
year: 2026
status: "v0.3 · in progress"
liveUrl: https://raditz-nine.vercel.app
repo: github.com/tmhnsly/raditz
links:
  - label: In use · Beatz DJ Studio concept
    url: "https://beats-dj-studio.vercel.app"
media:
  - type: image
    src: "/images/projects/code/raditz-showcase.webp"
    alt: "The Raditz showcase: a component tree beside the colour foundations and theme picker"
    title: "Showcase"
  - type: image
    src: "/images/projects/code/raditz-beatz-demo.webp"
    alt: "Beatz DJ Studio homepage built from Raditz sections, with a dark hero over a DJ booth photo"
    title: "In use: Beatz DJ Studio"
---

Raditz is my exploration of how an accessible, themeable component library could work. I wanted something I could prototype with quickly that didn't look like a prototype, so it grew into 106 React components and 26 page sections.

Components only use semantic colour tokens layered over Radix Colors, so light and dark mode come for free and one accent colour re-themes everything. The showcase lets you swap the accent, gray, radius and motion and see the whole library change. Every story is checked with axe as part of the test suite, which runs in CI along with the type check and builds. It's packaged and versioned, though it's still a work in progress.

To see how it held up on something real, I used it to rebuild the site for a DJ studio in Farnham. That's a concept redesign, not a paid job, shown with the owner's permission.

I built it with Claude Code. The specs, plans and decision records are in the repo if you want to see how I work with it.
