---
title: "Should everything animate?"
excerpt: "CSS animation is cheaper and greener than people think, and also easier to overdo than people admit. Both at once."
date: "2026-05-31"
category: Opinion
tags: ["CSS", "Performance", "Accessibility"]
thumb: motion
---

This site animates a fair amount. Cards reveal as they scroll in, the little project thumbnails draw themselves, titles come up a word at a time. So I've had to think about when motion earns its place and when it's just noise.

The performance worry is mostly solved if you're careful. Animating `transform` and `opacity` is cheap: the browser hands those to the compositor, off the main thread, and they don't trigger layout or repaint. Animate the wrong things, `width`, `top`, `box-shadow`, and you're back to janking the main thread on every frame. Most "animation is slow" complaints are really "that animation touched the wrong property".

The energy cost is the part people forget, because it isn't yours. An animation runs on the visitor's device, on their battery. One reveal is nothing. A page of looping, always-on motion is a small tax you've levied on every phone that opens it, and you'll never see the bill. That alone is a reason to make loops rare and to let entrances play once and stop.

Then there's the plainest problem: if everything moves, nothing means anything. Motion is a way of pointing. It should mark a change of state or show how two things relate in space. Decorate every element and you've spent the whole vocabulary on hello.

So the rule I land on is dull. Animate to communicate, not to decorate. Stick to transform and opacity. Let things finish and hold. And honour `prefers-reduced-motion`, because for some people it isn't a preference, it's a headache or worse. Done like that, motion is close to free and genuinely helps. Done everywhere, it's a battery drain that makes your site harder to use and calls it delight.
