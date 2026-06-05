---
title: "What an AI query costs, and what a night of scrolling does"
excerpt: "The water and energy figures for AI are alarming and slippery in equal measure. Real numbers, with their ranges left in, and a look at whether running models locally would even help."
date: "2026-06-02"
category: Opinion
tags: ["AI", "Sustainability", "Long-form writing"]
thumb: datacenter
---

You've seen the headline: a handful of chatbot questions "drinks a bottle of water." It comes from real research, the 2023 paper [*Making AI Less Thirsty*](https://arxiv.org/abs/2304.03271) out of UC Riverside, but it's doing a lot of quiet work. The number swings with which data centre answered, the season, how the local grid makes its power, and whether you count training the model or just the asking. The honest version is a range so wide it's nearly a shrug, and anyone quoting one tidy figure is selling you a feeling.

So let me quote untidy ones, with the ranges left in.

## Per use, the numbers are tiny

That same paper is where the bottle-of-water line comes from: GPT-3 needs roughly a 500 ml bottle for every [10 to 50 responses](https://news.ucr.edu/articles/2023/04/28/ai-programs-consume-large-volumes-scarce-water), so call it 10–50 ml a prompt. An hour of streaming video is a couple of hundred millilitres on the same back-of-envelope. Both are rounding errors next to anything you do with a tap.

```chart
{ "title": "Water per use, very rough millilitres", "unit": "ml",
  "note": "Estimates, and contested ones. AI per-prompt from Making AI Less Thirsty (Li et al., 2023), region-dependent; streaming derived from IEA (2020) per-hour energy times a grid water-intensity. For scale, a five-minute shower is roughly 45,000 ml and a single beef burger's footprint is about 2,500,000 (Water Footprint Network).",
  "data": [
    { "label": "One web search", "value": 1, "hue": "gray", "display": "~0.5" },
    { "label": "One AI chat prompt", "value": 30, "hue": "tomato", "display": "~10–50" },
    { "label": "1 hr HD video (YouTube / Netflix)", "value": 200, "hue": "blue", "display": "~200" },
    { "label": "1 hr short-form (TikTok / Reels)", "value": 250, "hue": "blue", "display": "~250" }
  ] }
```

A prompt is to a shower roughly what a shower is to filling a swimming pool. If your worry is personal use, asking a model a question is not where your water goes. A single beef burger carries the [cooling-tower equivalent](https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2012-WaterFootprintFarmAnimalProducts_1.pdf) of tens of thousands of prompts.

## The cost that's real is training, and aggregate

Two things don't fit on that chart. Training a large model is genuinely heavy: the same paper put GPT-3's training at about 700,000 litres of clean water onsite, 5.4 million litres once you count the power stations, call it ninety pairs of jeans' worth and rising, since newer models are bigger and undisclosed. And inference at planetary scale adds up even when each call is tiny, the way a dripping tap does.

But that's just as true of the internet we already run, and almost no one frames *that* as a crisis. Most of the world's internet traffic is video, and bytes are roughly where the energy and the cooling water go.

```chart
{ "title": "Share of global internet traffic", "unit": "%",
  "note": "From Sandvine's 2023 Global Internet Phenomena Report: video was about 65% of all traffic. Generative AI is a small but fast-growing slice. Traffic isn't a perfect proxy for energy, but it's the right order of magnitude.",
  "data": [
    { "label": "Video streaming", "value": 65, "hue": "blue", "display": "~65%" },
    { "label": "Web, gaming, other", "value": 22, "hue": "gray", "display": "~22%" },
    { "label": "Social & messaging", "value": 10, "hue": "green", "display": "~10%" },
    { "label": "Generative AI", "value": 3, "hue": "tomato", "display": "~3%, rising" }
  ] }
```

## Could we just run it locally?

The cleaner-sounding fix is to keep the model on your own machine: no data centre, no network, no cooling tower. And it's getting genuinely possible. A capable open model in the 70-billion-parameter range now [runs on a single Mac Studio](https://www.sitepoint.com/mac-m3-max-vs-rtx-4090-local-llm-benchmark/), holding the whole thing in unified memory and drawing on the order of 150 watts while it answers.

But local isn't automatically greener, and this is the part that surprised me. A data centre answers your prompt on hardware shared across thousands of simultaneous requests, batched and run near-flat-out. Your Mac answers one request, for one person, with all that silicon spun up just for you. So *per answer*, a typical cloud query (about [0.3 watt-hours](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use), where OpenAI and Google land too) can cost less energy than the same answer generated at home.

```chart
{ "title": "Energy per answer, watt-hours (rough)", "unit": "Wh",
  "note": "Cloud: a typical text query, ~0.3 Wh (Epoch AI, 2025; OpenAI and Google put it at 0.24–0.34). Local: a 70B model on a Mac Studio drawing ~150 W for the time it takes to answer one prompt, with no batching to share the cost. A heavy reasoning query in the cloud lands higher again. Estimates, not measurements.",
  "data": [
    { "label": "Cloud query (typical text)", "value": 0.3, "hue": "tomato", "display": "~0.3" },
    { "label": "Same answer, run locally (70B)", "value": 1.5, "hue": "green", "display": "~1–2" },
    { "label": "Heavy reasoning query (cloud)", "value": 3, "hue": "tomato", "display": "~3" }
  ] }
```

What local does buy is different: privacy, working offline, no data-centre cooling water at all, and a grid you choose, since solar on your own roof is clean in a way a coal-region data centre never is. What it can't buy yet is the frontier. The very best models, the Opus-class ones, don't fit on a laptop; they need cloud-scale compute, and that isn't changing soon.

So the interesting question is the crossover. As on-device accelerators get more efficient and small models get smarter, the bar for "good enough to run on-device" keeps rising, and we're arguably already over it for the everyday stuff: summarise this, draft that, complete this line of code. That is a huge share of all AI use, and it's exactly the load that could move off data centres and onto hardware you already own and power. The frontier stays in the cloud; the routine could come home.

Which loops back to streaming. The reason an hour of video is mostly fine isn't that it's tiny, it's that [about 70% of that energy is your own screen](https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines), already "local." Data centres are only ~5% of it. AI inference is the opposite: the work happens in the data centre, so that's where the watts and the water pool. Move the routine on-device and AI starts to look more like streaming, where the heavy lifting is something you power yourself.

## So what's the actual takeaway

Not "AI is fine, relax." It's that the useful question isn't *is this bad*, it's *what did this thing cost and was it worth it*. A prompt that saves an hour is a different trade from a generated video nobody asked for, the same way a video call home is a different trade from leaving a livestream on overnight.

And the biggest lever isn't any of us using less. It's what powers the buildings. A data centre on clean power and one on coal do identical work for wildly different cost, and that gap dwarfs the difference between a prompt and a shower. That's the number worth shouting about, and it's the one that rarely makes the headline.

## Sources

- [*Making AI Less Thirsty*](https://arxiv.org/abs/2304.03271), Li, Yang, Islam & Ren, 2023 — and the [UC Riverside summary](https://news.ucr.edu/articles/2023/04/28/ai-programs-consume-large-volumes-scarce-water).
- [The carbon footprint of streaming video](https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines), IEA (George Kamiya), 2020.
- [How much energy does ChatGPT use?](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use), Epoch AI, 2025.
- [Global Internet Phenomena Report 2023](https://www.applogicnetworks.com/blog/topic/global-internet-phenomena), Sandvine.
- [Mac M3 Max vs RTX 4090 local-LLM benchmark](https://www.sitepoint.com/mac-m3-max-vs-rtx-4090-local-llm-benchmark/), SitePoint, 2026.
- [Water footprint of farm animal products](https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2012-WaterFootprintFarmAnimalProducts_1.pdf), Mekonnen & Hoekstra, 2012.
