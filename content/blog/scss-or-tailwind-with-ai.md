---
title: "SCSS or Tailwind, now the AI writes most of it"
excerpt: "The old styling argument was about who types the class names. An assistant types them now, so the real cost moved to who has to read them, the model included. I measured it, and the honest answer is more nuanced than the hot take."
date: "2026-06-04"
category: Opinion
tags: ["SCSS", "Tailwind", "CSS", "AI"]
thumb: tokens
---

The SCSS-versus-Tailwind argument used to be about typing. Tailwind saved you from naming things; SCSS saved you from repeating yourself. You picked your pain and moved on.

An assistant does most of the typing now, so that half of the argument is settled in Tailwind's favour. It generates utility classes fluently, never has to invent a name, and rarely reaches for a class it defined three files ago. If writing were the whole cost, this post would end here.

It isn't. When a model writes most of the code, the expensive part is reading: every prompt re-reads the files in context, and you re-read its output to review it. And a wall of utility classes is a token-heavy, hard-to-scan way to express a style.

## Tokens are the new line count

Here's a single button, the kind every design system has, with hover, focus and dark variants. In Tailwind that's a string of fifteen-odd utilities on the element. In SCSS it's one class name plus a rule defined once, somewhere else. I counted the class attribute a model actually reads, with a real tokeniser:

```chart
{ "title": "Tokens to express one styled button (the class attribute a model reads)", "unit": "tokens",
  "note": "Measured with a GPT-style tokeniser (tiktoken, o200k_base). The Tailwind utilities tokenise into many pieces each; the SCSS rule is written once, somewhere else, and reused.",
  "data": [
    { "label": "Tailwind utility classes", "value": 78, "hue": "blue", "display": "78" },
    { "label": "SCSS class name", "value": 4, "hue": "tomato", "display": "4" }
  ] }
```

Four versus seventy-eight isn't the interesting number. The interesting bit is that the seventy-eight repeat. Every button, every card, every variant carries its full styling inline, so the cost scales with how many elements are on the page. So I built the same small card component both ways and counted again, and here the picture is more nuanced than the hot take:

```chart
{ "title": "Styling tokens in one ~60-line component (~10 styled elements)", "unit": "tokens",
  "note": "The same card, built both ways, measured with tiktoken. Tailwind repeats the utilities at every element, so it all sits inline in the markup. SCSS names each element once (153 tokens of markup) and keeps the rules in a separate file (482) the model loads only when it's actually editing styles.",
  "data": [
    { "label": "Tailwind (inline markup)", "value": 345, "hue": "blue", "display": "345" },
    { "label": "SCSS (markup only)", "value": 153, "hue": "tomato", "display": "153" },
    { "label": "SCSS (the stylesheet, once)", "value": 482, "hue": "gray", "display": "482, once" }
  ] }
```

Two things stand out, and the second is the one I didn't expect. The Tailwind component is heavier inline, 345 tokens against 153 for the same markup with named classes, because the utilities repeat at every element. But the SCSS rules aren't free: that stylesheet is 482 tokens, so for a *single* component read once with its styles, SCSS is actually the bigger ask, 153 plus 482 against Tailwind's 345.

So the SCSS win isn't "fewer tokens, always." It's two narrower things. First, the stylesheet is paid once and amortised: across a page of many buttons and cards reusing `.btn` and `.card`, the markup stays flat near 150 a component while Tailwind's repeats near 345. Second, and this matters more, semantic markup is legible *without* the stylesheet at all. A model editing `class="card"` can reason about the structure without ever loading the 482-token rule file; the Tailwind version carries its styling in the markup whether you care about it this turn or not, so it's always in context.

And a caveat that cuts in the same direction: those counts are from a GPT-style tokeniser. Claude's own tokeniser runs higher on prose like this, and higher still on code, so for the assistant that's actually reading these files the inline-Tailwind tax is, if anything, larger than the chart shows.

## What that actually costs

In pounds, almost nothing. At around [$3 per million input tokens](https://platform.claude.com/docs/en/about-claude/pricing) for a mid-tier model, the difference above is a fraction of a penny per read. Nobody should pick a styling tool to save hundredths of a pence.

The real cost is the context window, not the invoice. A model only has so much room to hold your code at once, and Tailwind-dense files fill it faster, so fewer files fit and the model "sees" less of the system while it works. The same tax hits a human reviewer: a diff that should read as "changed the padding" instead reads as a forty-token class string with one value different in the middle.

## Readable markup makes the model better, not just cheaper

This is the part I didn't expect. Semantic class names give the model something to reason about. `class="card"` next to a `.card` rule says *what the thing is*; a string of forty utilities says only *how it currently looks*, and the model has to infer the intent. Give an assistant `class="alert alert--error"` and ask it to add a warning variant and it does the obvious thing. Give it the utility soup and it tends to clone the whole string and tweak two values, because that's what the surrounding code taught it to do. Verbose context doesn't just cost more, it nudges the model toward copy-paste.

None of this means Tailwind is wrong. Its wins are real, and the token chart understates them: no naming, no dead CSS, styles colocated with markup, a design system enforced by constraints, and that single-component first read where it's genuinely the lighter option. If a project is write-heavy and short-lived, that's a great trade.

But most of mine are read-heavy and long-lived, and in the AI era "read-heavy" got more true, not less, because the model reads constantly. So this site is hand-written SCSS modules, and the thing I'm optimising for is the same thing that helps the assistant: markup you can actually read.

## Sources

The token counts are measurements, not vibes, but they're illustrative of one component, not a benchmark of your codebase. Paste the two markup snippets into a [tokeniser](https://platform.openai.com/tokenizer) and you'll get figures in the same ballpark; the gap, and the fact that the inline cost repeats per element, is the point.

- [OpenAI tokenizer](https://platform.openai.com/tokenizer): to reproduce the counts (I used tiktoken's `o200k_base`).
- [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing): the per-million-token rate.
- [Tailwind CSS: utility-first fundamentals](https://tailwindcss.com/docs/styling-with-utility-classes): the approach, in its own words.
