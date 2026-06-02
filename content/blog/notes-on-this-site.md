---
title: "Notes on this site"
excerpt: "How this portfolio is built, and a few of the smaller details, for anyone poking around."
date: "2026-06-02"
category: Studio log
tags: ["Process", "Code", "Next.js", "Workflow"]
---

This site is a bit of a calling card for how I work, so it seemed worth saying how it's put together.

It's a Next.js app in TypeScript, with hand-written SCSS rather than a utility framework. Every project carries its own media in a single model, whether that's an image or a video, so a piece and everything about it live together. Videos sit behind a lightweight YouTube facade, so nothing autoplays or phones home until you press play.

The code projects don't use screenshots. Each one has a small bespoke thumbnail drawn from the real product: Chork's activity rings, the Financial Times masthead, Agile's half-hourly price chart, Earnt's tear-off ticket. They're built from CSS and SVG, so they stay crisp at any size and flip with the light and dark themes.

Colour does the navigating. Each discipline maps to a Radix hue, and the interface re-tints as you move between sections: code, audio, video, writing. Cards reveal as they scroll into view, and everything respects a reduced-motion preference if you've set one.

A few smaller things. Images optimise to WebP locally on commit, so the repo stays light. Nested corners use a concentric radius, so an inner card's curve runs parallel to the one around it. The nav frosts whatever scrolls behind it, and titles reveal a word at a time.

The About page has the career side of things. If anything here looks like the sort of work you'd commission, get in touch.
