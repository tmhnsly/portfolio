---
title: "Drawing the project thumbnails in CSS"
excerpt: "Why the code projects on this site don't use a single screenshot, and how the little vector thumbnails are built."
date: "2026-06-03"
category: Studio log
tags: ["Code", "CSS"]
---

The code projects on this site don't have screenshots. Each one has a small drawing of itself instead: Chork's activity rings, the FT masthead, Agile's price chart. They're built from CSS and a bit of inline SVG, no image files.

I went this way for a few reasons. Screenshots of dashboards date badly and look cluttered at thumbnail size. They also can't follow the theme, so a bright UI grab sits wrong against a dark page. A drawing can flip its own colours, stay crisp at any size, and animate in when it scrolls into view without shipping a video.

The Agile one is a good example of how little it takes. The price curve is a single SVG path, drawn once by hand until the shape felt right, then animated with `stroke-dashoffset` so it draws itself on reveal. The cheap overnight window is one translucent rectangle behind it. The two stat cards underneath are divs. That's the whole thing.

The trade is time. A screenshot takes ten seconds, a drawing takes an evening. But it's an evening per project, paid once, and the result is mine rather than a frame of someone else's UI. For a portfolio that seemed worth it.

The catch to watch is scope. It's very easy to keep fiddling with a forty-pixel chart at midnight. At some point you have to call it and move on.
