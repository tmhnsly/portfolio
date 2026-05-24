---
title: "Studio log #04 — early 2026"
excerpt: "A quarterly catch-up. What I shipped, what I shelved, and the small thing that surprised me about React 19."
date: "2026-04-12"
category: Studio log
readingTime: 6
tags: ["Studio log", "Code", "React"]
---

A quarterly catch-up. What I shipped, what I shelved, and the small thing that surprised me about React 19.

## What shipped

Boucle hit v0.4 in March. The main change was replacing the old manual scheduling loop with a proper AudioWorklet, which fixed a long-standing timing drift issue on slower devices. The character dial now affects fifty-two parameters instead of thirty-one. I'm not sure anyone will notice, but I notice.

Site for L. went live in October. The client — a ceramicist in East London — wanted something quiet and generous with whitespace. We ended up cutting about a third of the proposed pages, which made everything better.

## What I shelved

A generative typeface project that turned out to be three separate hard problems rather than one interesting one. Filed under "good instinct, wrong moment."

Also shelved: an attempt to port my daily journaling setup from Obsidian to a custom web app. The friction of building it was higher than the friction of using Obsidian. Lesson re-learned.

## The React 19 thing

The thing that surprised me wasn't the new concurrent features or the compiler work — it was how much smaller the mental model got. The transition away from `useEffect` as the answer to everything feels genuinely structural, not just stylistic. I've been rebuilding the Boucle UI piece by piece using the new patterns and it's been consistently less code, less confusion.

> "The best framework feature is the one that makes you write less of it."
>
> — Note to self, February

Still getting used to the new form actions. Early verdict: good for what they're for, not a replacement for anything else.
