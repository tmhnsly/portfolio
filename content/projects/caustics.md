---
title: Caustics
desc: Real-time underwater light shader
discipline: code
date: "2025-07-01"
tech: ["WebGL", "GLSL"]
---

A real-time caustics shader running in the browser. Caustics — the rippling light patterns you see on the bottom of a pool — are notoriously expensive to simulate accurately. This is a fast approximation: good enough to be convincing, cheap enough to run in a tab.

Written in raw WebGL and GLSL with no framework. The shader is driven by a small noise function and a couple of uniforms for speed and intensity. About two hundred lines in total.
