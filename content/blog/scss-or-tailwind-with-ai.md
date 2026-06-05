---
title: "SCSS or Tailwind, now the AI writes most of it"
excerpt: "The old styling argument was about who types the class names. An assistant types them now, so the real cost moved to who has to read them, the model included."
date: "2026-06-04"
category: Opinion
tags: ["SCSS", "Tailwind", "CSS", "AI"]
thumb: code
---

The SCSS-versus-Tailwind argument used to be about typing. Tailwind saved you from naming things; SCSS saved you from repeating yourself. You picked your pain and moved on.

An assistant does most of the typing now, so that half of the argument is settled in Tailwind's favour. It generates utility classes fluently, never has to invent a name, and rarely reaches for a class it defined three files ago. If writing were the whole cost, this post would end here.

It isn't. When a model writes most of the code, the expensive part is reading: every prompt re-reads the files in context, and you re-read its output to review it. And a wall of utility classes is the most token-heavy, least scannable way to express a style.

## Tokens are the new line count

Here's a single button, the kind every design system has, with hover, focus and dark variants. In Tailwind that's a string of fifteen-odd utilities on the element. In SCSS it's one class name plus a rule defined once, somewhere else.

```chart
{ "title": "Approx. tokens to express one styled button (the markup a model reads)", "unit": "tokens",
  "note": "Rough counts via a GPT-style tokeniser. Tailwind utilities like focus-visible:ring-orange-500 tokenise into several pieces each; the SCSS rule is written once and amortised across every button.",
  "data": [
    { "label": "Tailwind utility classes", "value": 78, "hue": "blue", "display": "~78" },
    { "label": "SCSS class name", "value": 6, "hue": "orange", "display": "~6" }
  ] }
```

Six tokens versus seventy-eight isn't the interesting number. The interesting bit is that the seventy-eight repeat. Every button, every card, every variant carries its full styling inline, so the cost scales with how many elements are on the page. The SCSS rule is paid once and the markup stays flat. Across a single modest component file the gap looks like this:

```chart
{ "title": "Approx. styling tokens in one ~60-line component", "unit": "tokens",
  "note": "A component with ~10 styled elements. Tailwind repeats the utilities at every element; SCSS names each once and keeps the rules in a separate file the model only loads when it's actually editing styles.",
  "data": [
    { "label": "Tailwind (inline)", "value": 720, "hue": "blue", "display": "~720" },
    { "label": "SCSS (markup)", "value": 90, "hue": "orange", "display": "~90" },
    { "label": "SCSS (the stylesheet)", "value": 140, "hue": "gray", "display": "~140, once" }
  ] }
```

## What that actually costs

In pounds, almost nothing. At around [$3 per million input tokens](https://platform.claude.com/docs/en/about-claude/pricing) for a mid-tier model, the difference above is a fraction of a penny per read. Nobody should pick a styling tool to save hundredths of a pence.

The real cost is the context window, not the invoice. A model only has so much room to hold your code at once, and Tailwind-dense files fill it faster, so fewer files fit and the model "sees" less of the system while it works. The same tax hits a human reviewer: a diff that should read as "changed the padding" instead reads as a forty-token class string with one value different in the middle.

## Readable markup makes the model better, not just cheaper

This is the part I didn't expect. Semantic class names give the model something to reason about. `class="card"` next to a `.card` rule says *what the thing is*; a string of forty utilities says only *how it currently looks*, and the model has to infer the intent. Give an assistant `class="alert alert--error"` and ask it to add a warning variant and it does the obvious thing. Give it the utility soup and it tends to clone the whole string and tweak two values, because that's what the surrounding code taught it to do. Verbose context doesn't just cost more, it nudges the model toward copy-paste.

None of this means Tailwind is wrong. Its wins are real: no naming, no dead CSS, styles colocated with markup, a design system enforced by constraints. If a project is write-heavy and short-lived, that's a great trade.

But most of mine are read-heavy and long-lived, and in the AI era "read-heavy" got more true, not less, because the model reads constantly. So this site is hand-written SCSS modules, and the thing I'm optimising for is the same thing that helps the assistant: markup you can actually read.

## Sources

The token counts are illustrative, not benchmarks. Paste the two markup snippets into a [tokeniser](https://platform.openai.com/tokenizer) and you'll get figures in the same ballpark; the gap, and the fact that it repeats per element, is the point.

- [OpenAI tokenizer](https://platform.openai.com/tokenizer) — to reproduce the counts.
- [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing) — the per-million-token rate.
- [Tailwind CSS: utility-first fundamentals](https://tailwindcss.com/docs/styling-with-utility-classes) — the approach, in its own words.
