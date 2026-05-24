---
title: snip
desc: A tiny CLI for clipping useful URLs
discipline: code
date: "2025-05-01"
tech: ["Node.js", "TypeScript"]
---

A command-line tool for saving URLs with annotations. You pass it a link; it fetches the page title, lets you add a few hashtags, and saves everything to a local markdown file named after today's date.

No database, no cloud sync, no account. Just a folder of markdown files you can grep. I use it every day and have never felt the need to make it bigger.

```bash
$ snip https://example.com/#useful
saved to: ~/.snips/2025-05-01-a1b2.md
```
