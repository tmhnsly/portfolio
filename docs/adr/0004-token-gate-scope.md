# The token gate stops at colours, font-weight, and letter-spacing

The stylelint token gate (`stylelint.config.mjs`, `stylelint-declaration-strict-value`) enforces "no magic numbers — use a token" for **colour properties, `fill`/`stroke`, `font-weight`, and `letter-spacing`**. A deepening review will be tempted to widen it to `font-size` and `z-index` next. Both were evaluated and **deliberately left ungated** — gating them is net-negative.

## font-size is not a discrete-token axis
Its literals fall into three kinds, none of which the type scale (`--fs-*`) should own:

- **Fluid display sizes** — `clamp(40px, 8vw, 68px)` etc. The rule passes functions, and the min/max bounds are intentionally not tokens (they're a fluid range, not a step).
- **Icon / glyph dimensions** — react-icons render at `font-size` (e.g. the Nav toggle `19px`, burger `24px`, menu icon `18px`, prev/next chevron `22px`). This is a *control* axis, not text. Some values coincidentally equal `--fs-h4`/`--fs-body-l`/`--fs-h3`, but tokenising an icon's size as a **text** token would wrongly couple glyph size to the type scale — change `--fs-h3` and the chevrons would move. If these proliferate, give them their own `--icon-*` family (not `--fs-*`); today they're component-local and few.
- **Contextual `em`/`rem`** — the `LinkArrow` `1.2em` default (size relative to its text context) and a couple of `rem` counter sizes. Contextual one-offs, not a shared scale.

Gating `font-size` would therefore either force wrong type-scale coupling for icons or demand ~10 orphan tokens — noise for no locality gain.

## z-index global layers are already tokenised
The cross-component stacking order uses `--z-*` (`--z-nav`, `--z-overlay`, `--z-card`, …). The remaining literals are **local** stacking inside a single component's own context — `z-index: 1` to sit a label above its sibling, `-1`/`-2` for behind-layers. Those are correct as literals; a global token there would be wrong. So `z-index` is not gated.

## Decision
Keep the gate scoped to colours/`fill`/`stroke`/`font-weight`/`letter-spacing`. Revisit only if a genuinely discrete, reused scale emerges (e.g. an `--icon-*` family worth enforcing). Don't re-suggest "widen the gate to font-size / z-index" without that.
