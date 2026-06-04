---
title: "SCSS or Tailwind, now the AI writes most of it"
excerpt: "The old styling argument was about who has to type the class names. An assistant types them now, so the question has quietly changed."
date: "2026-06-04"
category: Opinion
tags: ["SCSS", "Tailwind", "CSS", "AI"]
---

The SCSS versus Tailwind argument used to be about typing. Tailwind saved you from naming things and hunting for the class that already existed. SCSS gave you readable markup and one place to change a colour. You picked your pain.

An assistant does most of the typing now, so that part of the argument is over. And on the face of it, that hands it to Tailwind. Utility classes are the most AI-friendly CSS there is: they're local, they're predictable, and the model almost never has to invent a name or remember one it wrote three files ago. SCSS asks it to hold a mental model of the cascade, which it's worse at, and which drifts as the project grows.

But there's a flip side people skip. When the machine writes most of the code, you spend your time reading and reviewing, not writing. And a wall of forty utility classes is write-friendly and read-hostile. You can't scan it, diffs are noise, and a review turns into a word search. Semantic class names plus a stylesheet stay legible to the next person, who is usually you in six months, sometimes the assistant on its second pass.

So the tedium SCSS used to cost, the naming and the boilerplate, is exactly the bit AI removes for free. What it can't remove is the reading. This site is hand-written SCSS modules for that reason. Tailwind's wins are real, no dead CSS, nothing to name, styles next to markup. I just think the thing you optimise for shifted from writing to reading, and SCSS reads better.
