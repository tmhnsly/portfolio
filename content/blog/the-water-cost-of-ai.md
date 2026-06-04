---
title: "What an AI query costs, and what a night of scrolling does"
excerpt: "The water and energy figures for AI are alarming and slippery in equal measure. Putting real numbers next to the internet we already run helps."
date: "2026-06-02"
category: Opinion
tags: ["AI", "Sustainability", "Long-form writing"]
thumb: datacenter
---

You've seen the headline: a handful of chatbot questions "drinks a bottle of water." It comes from real research, the 2023 *Making AI Less Thirsty* paper, but it's doing a lot of quiet work. The number swings with which data centre answered, the season, how the local grid makes its power, and whether you count training the model or just the asking. The honest version is a range so wide it's nearly a shrug, and anyone quoting one tidy figure is selling you a feeling.

So let me quote untidy ones, with the ranges left in.

## Per use, the numbers are tiny

On the best current estimates, a single text prompt costs somewhere in the low tens of millilitres of water for cooling. An hour of streaming video is a couple of hundred. Both are rounding errors next to anything you do with actual taps.

```chart
{ "title": "Water per use, very rough millilitres", "unit": "ml",
  "note": "Estimates only, and contested. AI per-prompt adapted from Ren et al. (2023) and region-dependent; streaming derived from IEA (2020) per-hour energy times a grid water-intensity. For scale a five-minute shower is roughly 45,000 ml, and a single beef burger's footprint is about 2,500,000.",
  "data": [
    { "label": "One web search", "value": 1, "hue": "gray", "display": "~0.5" },
    { "label": "One AI chat prompt", "value": 30, "hue": "tomato", "display": "~10–50" },
    { "label": "1 hr HD video (YouTube / Netflix)", "value": 200, "hue": "blue", "display": "~200" },
    { "label": "1 hr short-form (TikTok / Reels)", "value": 250, "hue": "blue", "display": "~250" }
  ] }
```

A prompt is to a shower roughly what a shower is to filling a swimming pool. If your worry is personal use, asking a model a question is not where your water goes. A single beef burger carries the cooling water of tens of thousands of prompts.

## The cost that's real is training, and aggregate

Two things don't fit on that chart. Training a large model is genuinely heavy: the 2023 paper put GPT-3's training water near 700,000 litres, roughly ninety pairs of jeans, and newer models are bigger and undisclosed. And inference at planetary scale adds up even when each call is tiny, the same way a dripping tap does.

But that's exactly true of the internet we already run, and almost no one frames *that* as a crisis. Most of the internet's traffic is video, and bytes are roughly where the energy and the cooling water go.

```chart
{ "title": "Share of global internet traffic", "unit": "%",
  "note": "Approximate, from network-equipment reports (e.g. Sandvine). Video is the clear majority of the bytes; generative AI is a small but fast-growing slice. Traffic isn't a perfect proxy for energy, but it's the right order of magnitude.",
  "data": [
    { "label": "Video streaming", "value": 65, "hue": "blue", "display": "~65%" },
    { "label": "Web, gaming, other", "value": 22, "hue": "gray", "display": "~22%" },
    { "label": "Social & messaging", "value": 10, "hue": "green", "display": "~10%" },
    { "label": "Generative AI", "value": 3, "hue": "tomato", "display": "~3%, rising" }
  ] }
```

We made our peace with streaming because it arrived slowly. AI arrived loudly, so it gets the water-bottle headline while a few billion autoplaying feeds run quietly in the background.

## So what's the actual takeaway

Not "AI is fine, relax." It's that the useful question isn't *is this bad*, it's *what did this particular thing cost and was it worth it*. A prompt that saves an hour is a different trade from a generated video nobody asked for, the same way a video call home is a different trade from leaving a livestream on overnight.

And the biggest lever isn't any of us using less. It's what powers the buildings. A data centre on clean power and one on coal do identical work for wildly different cost, and that gap is larger than the difference between a prompt and a shower. That's the number worth shouting about, and it's the one that rarely makes the headline.
