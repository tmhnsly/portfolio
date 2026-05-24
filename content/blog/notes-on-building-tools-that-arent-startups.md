---
title: "Notes on building tools that aren't startups"
excerpt: "In praise of small, single-purpose software you make for yourself, ship for ten people, and never grow."
date: "2026-03-28"
category: Process
readingTime: 12
tags: ["Process", "Tools"]
---

In praise of small, single-purpose software you make for yourself, ship for ten people, and never grow.

A few months ago I started using a tiny CLI I wrote one weekend. It does one thing: it watches a folder for new image files, runs them through a Lightroom export preset I configured once, and drops the results in a folder named after today's date. It will never have users. It will never get a landing page. It saves me about ten minutes a day and is, for me, software.

## Tools don't need to be products

I think the most interesting kind of software is the kind nobody talks about. Not the apps with the funding round and the launch tweet, but the tiny utilities that one specific person built for one specific friction in their day. A python script that renames files. A bash function that opens the latest git repo. A 200-line web app that converts BPM to milliseconds because the maker is tired of doing it in their head.

> "The most interesting kind of software is the kind nobody talks about. The tiny utility one person built for one specific friction."
>
> — Note to self, somewhere in March

These tools have a different relationship with their maker than products do. A product owes its users patches, documentation, a roadmap. A tool owes its maker exactly what they decided it should do, no more. You can ship it half-broken if you don't need the broken half.

## The five-person ship

Some of these tools end up being useful to other people too. The threshold for sharing them is low — a friend asks what you used, and you send them the repo. Five people use it, then ten, then maybe twenty. Nobody calls it a product. Nobody asks for features it doesn't have.

```bash
$ snip https://github.com/...
saved to: ~/.snips/2026-03-28-a8c1.md
annotated: yes (3 hashtags)
```

I'd like to make more software like this. Not because I have anything against products — I work on products for a living — but because tools have a kind of honesty about them that products can't. They exist to do a thing. They don't have to be anything else.

※ This piece was written with `snip`, a tiny CLI that exists for exactly one person.
