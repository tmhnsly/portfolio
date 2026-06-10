---
title: "What an AI query costs, and where that cost actually lands"
excerpt: "The water and energy figures for AI are alarming and slippery in equal measure. Here they are with the ranges left in, the 2025 numbers folded back, and the part the headline keeps burying: the cost is mostly about where the data centre sits, not how many prompts you send."
date: "2026-06-02"
category: Opinion
tags: ["AI", "Sustainability", "Long-form writing"]
thumb: datacenter
---

You've seen the headline: a handful of chatbot questions "drinks a bottle of water." It comes from real research, the UC Riverside paper [*Making AI Less Thirsty*](https://dl.acm.org/doi/10.1145/3724499), now peer-reviewed in Communications of the ACM, but the number is doing a lot of quiet work. It's a 2023 estimate for GPT-3, modelled rather than measured, and it swings with which data centre answered, the season, and how the local grid makes its power. The honest version is a range so wide it's nearly a shrug, and anyone quoting one tidy figure is selling you a feeling.

So let me quote untidy ones, with the ranges left in.

## Per use, the cost is tiny, and nobody agrees on how tiny

That paper is where the bottle line comes from: GPT-3 needs a 500 ml bottle for roughly [10 to 50 medium-length responses](https://news.ucr.edu/articles/2023/04/28/ai-programs-consume-large-volumes-scarce-water), so call it 10 to 50 ml a prompt. But that's a 2023 model on 2023 assumptions. In 2025 Google published a [measured](https://www.technologyreview.com/2025/08/21/1122288/google-gemini-ai-energy/) figure for a median Gemini text prompt: about **0.26 ml** of water, two orders of magnitude lower, though on a narrower boundary that counts only the data centre's own cooling and not the water behind its electricity. The truth sits somewhere in that gap, and even the high end is a rounding error next to a tap.

```chart
{ "scale": "log", "title": "Water per use, millilitres (log scale)", "unit": "ml",
  "note": "AI per prompt spans a wide range: ~0.26 ml is Google's 2025 measured median Gemini prompt (data-centre cooling only); 10–50 ml is the older modelled GPT-3 estimate from Making AI Less Thirsty (Li et al., CACM 2025). Search and an hour of video are order-of-magnitude. A five-minute shower is ~47 L (EPA), a beef burger ~2,500 L for a 150 g patty (Mekonnen & Hoekstra, 2012). Note the log scale: each gridline is 10x the last.",
  "data": [
    { "label": "One web search", "value": 0.5, "hue": "gray", "display": "~0.5" },
    { "label": "One AI chat prompt", "value": 4, "low": 0.26, "high": 50, "hue": "tomato", "display": "~0.3–50" },
    { "label": "1 hr HD video", "value": 200, "hue": "gray", "display": "~200" },
    { "label": "Five-minute shower", "value": 47000, "hue": "blue", "display": "~47,000" },
    { "label": "One beef burger", "value": 2500000, "hue": "blue", "display": "~2,500,000" }
  ] }
```

A prompt is to a shower roughly what a drip is to a full bath. If your worry is personal use, asking a model a question is not where your water goes. One beef burger carries the [cooling-tower equivalent](https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2012-WaterFootprintFarmAnimalProducts_1.pdf) of tens of thousands of prompts, even at the pessimistic end.

## The costs that are real are training, and aggregate

Two things don't fit on that chart. Training a large model is genuinely heavy: the same paper put GPT-3's training at about 700,000 litres of clean water onsite, 5.4 million once you count the power stations. That 700,000 litres is roughly ninety pairs of jeans' worth, evaporated, and it's a best case, it [roughly triples](https://dl.acm.org/doi/10.1145/3724499) if the run happens in a hotter region, and newer models are bigger and undisclosed. And inference at planetary scale adds up even when each call is tiny, the way a dripping tap fills a bucket: the same authors project global AI water withdrawal at 4 to 6 billion cubic metres a year by 2027, more than several Denmarks.

But that's just as true of the internet we already run, and almost no one frames *that* as a crisis. Most of the world's traffic is video, and bytes are roughly where the energy and the cooling water go.

```chart
{ "type": "stacked", "title": "Share of global internet traffic", "unit": "%",
  "note": "Share of traffic, not energy. Video was about 65% of global internet traffic (Sandvine, 2023); generative AI is a small but fast-growing slice. Traffic is a rough proxy for where the bytes, and so the watts and cooling water, pool.",
  "data": [
    { "label": "Video streaming", "value": 65, "hue": "blue", "display": "~65%" },
    { "label": "Web, gaming, other", "value": 22, "hue": "gray", "display": "~22%" },
    { "label": "Social & messaging", "value": 10, "hue": "green", "display": "~10%" },
    { "label": "Generative AI", "value": 3, "hue": "tomato", "display": "~3%, rising" }
  ] }
```

## Could we just run it locally?

The cleaner-sounding fix is to keep the model on your own machine: no data centre, no network, no cooling tower. And it's getting genuinely possible. A capable open model in the 70-billion-parameter range now [runs on a single Mac Studio](https://www.sitepoint.com/mac-m3-max-vs-rtx-4090-local-llm-benchmark/), holding the whole thing in unified memory and drawing on the order of 150 watts while it answers.

But local isn't automatically greener, and this is the part that surprised me. A data centre answers your prompt on hardware shared across thousands of simultaneous requests, batched and run near-flat-out. Your Mac answers one request, for one person, with all that silicon spun up just for you. Measured on the same model, [cloud accelerators do more useful work per watt](https://arxiv.org/abs/2511.07885) than local ones, so *per answer* a typical cloud query, about [0.3 watt-hours](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use) (where OpenAI and Google also land, 0.24 to 0.34), can cost less energy than the same answer generated at home.

```chart
{ "scale": "log", "title": "Energy per answer, watt-hours (log scale)", "unit": "Wh",
  "note": "Cloud: a typical short text query, ~0.24–0.34 Wh (Epoch AI 2025; OpenAI and Google agree). Local: a 70B model on a Mac Studio answering one un-batched prompt, no batching to share the cost. Long or reasoning queries run far higher in the cloud, up to ~40 Wh for a 100k-token input (Epoch). Estimates, not measurements.",
  "data": [
    { "label": "Typical text query (cloud)", "value": 0.3, "low": 0.24, "high": 0.34, "hue": "tomato", "display": "~0.24–0.34" },
    { "label": "Same answer, run locally (70B)", "value": 1.5, "low": 1, "high": 2, "hue": "green", "display": "~1–2" },
    { "label": "Long / reasoning query (cloud)", "value": 10, "low": 2.5, "high": 40, "hue": "tomato", "display": "~2.5–40" }
  ] }
```

What local does buy is different: privacy, working offline, no data-centre cooling water at all, and a grid you choose, since solar on your own roof is clean in a way a coal-region data centre never is. What it can't buy yet is the frontier. The very best models, the Opus-class ones, don't fit on a laptop; they need cloud-scale compute, and that isn't changing soon. The interesting crossover is the everyday stuff, summarise this, draft that, complete this line of code, which is already good enough on-device and is a huge share of all AI use. The frontier stays in the cloud; the routine could come home.

## The thing the headline misses: where, not how much

Here's the part the bottle-of-water line buries. A litre evaporated in a data centre is not the same everywhere. Hydrologists separate water *withdrawn*, taken and mostly returned, from water *consumed*, evaporated and gone from the local watershed, and it's consumption in a specific place that actually bites. The same query costs wildly different amounts of real water depending on site and season: a data centre's cooling efficiency runs anywhere from about [1 to 9 litres per kWh](https://dl.acm.org/doi/10.1145/3724499) across the year, and the water behind its electricity swings further by grid. Run the identical workload in a water-stressed desert versus a cool, wet, clean-grid region, and one Purdue analysis finds the [stress-adjusted impact differs by over a thousandfold](https://arxiv.org/abs/2506.22773). Roughly two-thirds of new data centres are going up in already water-stressed areas.

So the lever that matters isn't you sending fewer prompts. It's where the building sits and what powers it. Data centres are a real and [fast-growing load](https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf), about 4% of US electricity in 2023 and climbing, but a clean-grid site in a wet region and a coal-powered one in a drought do identical work for wildly different cost, and that gap dwarfs the difference between a prompt and a shower.

## So what's the actual takeaway

Not "AI is fine, relax," and not "stop prompting to save the planet." The useful question was never *is this bad*, it's *what did this cost, where, and was it worth it*. A prompt that saves an hour is a different trade from a generated video nobody asked for, the same way a video call home is a different trade from leaving a livestream on overnight.

And the biggest lever isn't any of us using less. It's what powers the buildings and where they draw their water. That's the number worth shouting about, and it's the one that rarely makes the headline.

## Sources

- [*Making AI Less Thirsty*](https://dl.acm.org/doi/10.1145/3724499), Li, Yang, Islam & Ren, Communications of the ACM, 2025 (peer-reviewed version of the [2023 preprint](https://arxiv.org/abs/2304.03271)); see also the [UC Riverside summary](https://news.ucr.edu/articles/2023/04/28/ai-programs-consume-large-volumes-scarce-water).
- [Measuring the environmental impact of AI at Google scale](https://www.technologyreview.com/2025/08/21/1122288/google-gemini-ai-energy/): Google's 2025 per-prompt disclosure (~0.24 Wh, ~0.26 ml), and the [critique](https://www.implicator.ai/google-says-a-prompt-uses-0-24-wh-researchers-say-the-math-is-incomplete/) that its water boundary is narrow.
- [How much energy does ChatGPT use?](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use), Epoch AI, 2025: ~0.3 Wh typical, up to ~40 Wh for long inputs.
- [SCARF: water-stress-aware data-centre siting](https://arxiv.org/abs/2506.22773), Wu et al., Purdue, 2025: the >1000x by-location figure and the consumption-vs-withdrawal framing.
- [Intelligence per watt: local vs cloud inference](https://arxiv.org/abs/2511.07885), 2025: cloud accelerators are more energy-efficient per answer on the same model.
- [US data center energy usage report](https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf), LBNL, 2024: data centres at ~4% of US electricity, rising.
- [The carbon footprint of streaming video](https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines), IEA (George Kamiya), 2020.
- [Water footprint of farm animal products](https://www.waterfootprint.org/resources/Mekonnen-Hoekstra-2012-WaterFootprintFarmAnimalProducts_1.pdf), Mekonnen & Hoekstra, 2012.
