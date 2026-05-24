---
title: The case for handwritten CSS
excerpt: A defence of writing your own classes, in 2025, even when Tailwind is right there. Or, a love letter to BEM.
date: "2025-11-07"
category: Code
readingTime: 14
tags: ["Code", "CSS", "Process"]
---

A defence of writing your own classes, in 2025, even when Tailwind is right there. Or, a love letter to BEM.

I use Tailwind on client projects when the team already uses it. I write BEM on everything else. The case for handwritten CSS isn't that it's faster or more powerful — it's that it forces you to name things, and naming things forces you to understand them.

When you write `.project-card__title--featured`, you've made a decision about what this element is, where it lives, and when the variant applies. When you write `text-xl font-semibold text-red-500`, you've described what it looks like right now. Both are valid. They're answering different questions.

The projects I've maintained longest have handwritten CSS. That's probably a coincidence. But probably not entirely.
