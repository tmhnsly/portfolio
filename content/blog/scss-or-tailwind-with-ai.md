---
title: "Is Tailwind the best way to write styles, now the AI reads everything?"
excerpt: "An assistant types most of the class names now, so the cost that's left is reading them, the model included. I measured the same button styled four ways, Tailwind, CSS Modules, CSS-in-JS and shadcn, and laid out where each one fits. There's no single winner, but the numbers make the trade-offs concrete."
date: "2026-06-04"
category: Opinion
tags: ["SCSS", "Tailwind", "CSS", "AI"]
thumb: tokens
---

The SCSS-versus-Tailwind argument used to be about typing. Tailwind saved you from naming things; SCSS saved you from repeating yourself. You picked your pain and moved on.

An assistant does most of the typing now, so that half of the argument is settled in Tailwind's favour. It generates utility classes fluently, never has to invent a name, and rarely reaches for a class it defined three files ago.

What it doesn't change is reading. When a model writes most of the code, the expensive part is reading it: every prompt re-reads the files in context, and you re-read its output to review it. So rather than argue about it, I measured it. I took one button, styled it four ways, and counted what a model has to read in each. This post is those numbers, and where each approach fits.

## The unit: one button

Here is a real button from this site, the component every design system has, with a hover, focus and dark story. The markup names it once:

```tsx
export function Button({ variant, children, href, ...rest }: ButtonProps) {
  const cls = cx(styles.btn, styles[variant]);
  return <a href={href} className={cls}>{children}</a>;
}
```

and the rule lives once, in a file the model only opens when it's editing styles:

```scss
.btn { display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-2); font-weight: var(--fw-semibold); font-size: var(--fs-body-s);
  letter-spacing: -0.005em; border-radius: var(--radius-lg); cursor: pointer; }
.primary { padding: var(--pad-btn); background: var(--accent); color: var(--on-accent);
  box-shadow: 0 6px 18px color-mix(in srgb, var(--accent) 27%, transparent); }
```

The Tailwind translation of the same button carries the whole description inline, on the element:

```tsx
<a className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5
  text-sm font-semibold tracking-tight text-white bg-violet-600 shadow-lg
  hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-violet-500 focus-visible:ring-offset-2
  dark:bg-violet-500 dark:hover:bg-violet-400">{children}</a>
```

All four approaches render the same thing. Here are this site's real buttons, live, so you can hover them, focus them, and flip the page to dark:

```demo
button
```

I counted the styling a model reads on the element each time the button appears, four ways:

```chart
{ "title": "Styling tokens per button, at the call site", "unit": "tokens",
  "note": "This site's real Button, plus faithful translations, measured with tiktoken (o200k_base). This is what sits on the element each time the button is used. The first primary button has a download icon: in Tailwind that takes it from 75 to 81 (the icon brings its own `size-4`); the named approaches are unchanged, the icon is sized by a shared rule.",
  "data": [
    { "label": "Tailwind, with icon", "value": 81, "hue": "blue", "display": "81" },
    { "label": "Tailwind, no icon", "value": 75, "hue": "blue", "display": "75" },
    { "label": "shadcn (variant prop)", "value": 4, "hue": "orange", "display": "4" },
    { "label": "CSS Modules / SCSS (class names)", "value": 2, "hue": "tomato", "display": "2" },
    { "label": "CSS-in-JS (styled element)", "value": 1, "hue": "green", "display": "1" }
  ] }
```

The difference is where the styling lives. Tailwind puts the full description on the element, so the model reads all of it every time the button appears. The other three name the button at the call site and keep the description somewhere else: a class (`btn primary`), a styled component, or a variant prop on an owned component. The icon shows the same mechanism at a smaller scale: in Tailwind it arrives with its own `size-4`, so the count rises with each decoration; in the named approaches the icon is sized once by a shared rule, so the call site doesn't move.

## What's paid once

That "somewhere else" isn't free. Each named approach writes a definition a single time and reuses it:

```chart
{ "title": "Paid once: the definition each approach writes a single time", "unit": "tokens",
  "note": "The styling written once and reused across every button, tiktoken o200k_base. Tailwind shares nothing, it lives inline on each element (above). shadcn keeps its base styling in a shared owned primitive, not re-counted per button. CSS-in-JS keeps it in runtime JS; CSS Modules in a static stylesheet (all four variants).",
  "data": [
    { "label": "CSS Modules / SCSS (stylesheet)", "value": 247, "hue": "tomato", "display": "247" },
    { "label": "CSS-in-JS (styled def, runtime)", "value": 154, "hue": "green", "display": "154" },
    { "label": "Tailwind (nothing shared)", "value": 0, "hue": "blue", "display": "0" }
  ] }
```

Put the two charts together and the trade-off is symmetrical, not one-sided.

Read **one** button once, with its styles, and Tailwind is the lighter option: 75 tokens and you're done, against 2 + 247 for CSS Modules, because the named approach makes you load the definition too. For a component written once and rarely revisited, Tailwind reads cheaper.

Read **many** buttons and the definition amortises. Tailwind costs about 75 a button with nothing shared; CSS Modules costs about 2 a button plus the 247 paid once. The totals cross at roughly the fourth button (75 × N against 2 × N + 247), and the gap widens from there. A page with one button leans Tailwind; a page with twenty leans the other way. Most real interfaces have a lot of elements, and a model holds many of them in context at once.

There's one factor the totals miss: a named element is legible without its styles at all. A model editing `className={styles.btn}` or `<Button variant="primary">` can reason about what the element is without loading the rule. The Tailwind element carries its description whether this turn needs it or not.

A caveat on the counts themselves: these are from a GPT-style tokeniser. Anthropic's guidance is that a GPT tokeniser undercounts Claude by roughly 15 to 20 percent on prose and more on code, so for an assistant reading these files the inline figures run a little higher than shown, in the same direction.

## What the tokens cost

In money, almost nothing. At around [$3 per million input tokens](https://platform.claude.com/docs/en/about-claude/pricing) for a mid-tier model, the gaps above are a fraction of a penny per read. This isn't an argument about the invoice.

The constraint is the context window. A model holds only so much of your code at once, and utility-dense files fill it faster, so fewer files fit and the model sees less of the system while it works. The same applies to a human reviewer: a diff that should read as "changed the padding" instead reads as a forty-token class string with one value different in the middle.

## What the count doesn't show

Two things the token count says nothing about decide as much as it does.

**Meaning.** A semantic name carries intent: `alert alert--error` or `<Button variant="destructive">` says what the element is. A utility string says how it currently looks, and the intent has to be inferred. In practice this shows up when you ask a model to add a variant: given a name it tends to add a sibling rule; given a long utility string it tends to clone the string and change a value or two, because that is the pattern around it. Tailwind, CSS Modules, CSS-in-JS and shadcn all sit on the semantic side of this except bare utilities on the element.

**Where it runs.** This is the sharpest practical difference in 2026. Tailwind and CSS Modules compile to static CSS, and shadcn is Tailwind, so all three render in React Server Components without ceremony. Runtime CSS-in-JS (styled-components, Emotion) executes during render, which under the Next.js App Router restricts it to Client Components ([Next.js docs](https://nextjs.org/docs/app/guides/css-in-js)). If a project is server-first, that's a real constraint regardless of how the tokens count.

## So, is Tailwind the best way?

There isn't a single best way; there's a fit per project. The numbers and constraints above point to a few clear cases:

- **Write-heavy, short-lived, or a solo prototype:** Tailwind's per-read lightness and zero naming are a genuine edge. The repetition cost barely matters if nothing is reused much.
- **Read-heavy, long-lived, lots of elements:** the per-element inline cost compounds and the definition amortises, so a named approach (CSS Modules, or Tailwind tucked into owned components) reads cheaper and stays legible.
- **You want Tailwind's speed but semantic call sites:** shadcn is the middle path, utilities and a constrained system, but the components are yours and read as `Card` and `Button` rather than utility strings. The catch the numbers show is that layout utilities still live inline, so it's lighter than bare Tailwind, not as light as a class name.
- **Server-first (RSC):** any of the static options fits; runtime CSS-in-JS is the one that fights the grain.

For this site I use CSS Modules. It's read-heavy and long-lived, and the markup stays legible to me and to the assistant for the same reason. That's a fit for these constraints, not a recommendation for yours. The honest answer to the title is that Tailwind can be the best way, for the right project, and the question worth asking isn't "which tool wins" but "which surface do I want a model to read ten thousand times."

## Sources

The token counts are real measurements, but they describe one button, not your codebase. Paste any of the snippets into a [tokeniser](https://platform.openai.com/tokenizer) and you'll land in the same range; the shape of the gap, and the fact that the inline cost sits on every element, is the point.

- [OpenAI tokenizer](https://platform.openai.com/tokenizer): to reproduce the counts (I used tiktoken's `o200k_base`).
- [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing): the per-million-token rate, and the note that GPT tokenisers undercount Claude.
- [Tailwind CSS: utility-first fundamentals](https://tailwindcss.com/docs/styling-with-utility-classes): the approach, in its own words.
- [Next.js: CSS-in-JS](https://nextjs.org/docs/app/guides/css-in-js): why runtime CSS-in-JS is restricted to Client Components under the App Router.
- [shadcn/ui](https://ui.shadcn.com): components you copy into your repo and own, built on Tailwind and Radix.
