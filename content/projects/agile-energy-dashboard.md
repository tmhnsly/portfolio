---
title: Agile Energy Dashboard
desc: Real-time energy tariff dashboard with load-shifting simulation
discipline: code
date: "2025-06-01"
tags: ["React", "TypeScript", "Storybook", "Charts"]
role: Design + engineering
year: 2025
status: "Live"
liveUrl: https://agile-energy-dashboard.vercel.app
---

A real-time energy-tariff dashboard — consumption tracking, flexibility insights, and a load-shifting simulation that shows what moving usage to cheaper half-hours would actually save.

## Making a variable tariff legible

Agile tariffs change price every half hour, which is powerful and almost impossible to reason about in your head. The dashboard pulls live tariff data and overlays it on your consumption, then lets you simulate shifting load into the cheap windows.

The interface is built on a Storybook component library, so the charts, gauges and controls stay consistent and are documented in isolation. React + TypeScript throughout.
