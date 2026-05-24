---
title: Boucle
desc: A generative drum kit in the browser
discipline: code
date: "2026-03-01"
featured: true
tech: ["React", "TypeScript", "WebAudio", "Three.js"]
role: Design + engineering
year: 2026
status: "Live · v0.4"
repo: github.com/th/boucle
liveUrl: https://boucle.tomhinsley.com
gallery:
  - grad: "linear-gradient(135deg, #dd4a2e, #6b1d1a)"
    caption: "The empty grid. Sixteen pads, one knob."
  - grad: "linear-gradient(135deg, #e85f3d, #832418)"
    caption: "Mid-session. Active pads pulse with audio."
  - grad: "linear-gradient(135deg, #b03e26, #441510)"
    caption: "The character dial, mapped to four dozen params."
---

A generative drum kit that lives in the browser. Sixteen pads, one knob for character, no two sessions the same.

## A way to make noise without opening Ableton

Boucle pairs a small grid sequencer with a procedural sample bank. Each pad re-synthesises its own sound on the fly, so no two sessions sound the same — the only knob you turn is "character", mapped to a few dozen parameters under the hood.

I started it as a way to test how far the Web Audio API could be pushed for real-time synthesis. It ended up becoming the thing I default to when I want to make noise quickly — between meetings, on a train, somewhere with my headphones in.

Visuals are kept deliberately minimal. The pads glow when they hit; the dials nudge in response to the audio engine. Three.js draws a small particle field behind the grid that breathes with the master amplitude.

It's open-source, runs on any modern browser, and works on a phone if you don't mind the touch targets being a bit small.

## Built with

React 19 handles the UI scaffold and state. The Web Audio API does synthesis and scheduling — no external audio library. Three.js provides the small 3D visualisation layer. Vite runs the build and HMR.

```bash
# run locally
pnpm install
pnpm dev
```
