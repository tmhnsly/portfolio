# The Discipline definition is intentionally split across a few keyed structures

Adding or recolouring a **Discipline** touches several places: `HUE`, `LABEL`, and `DISCIPLINE_ORDER` in `lib/disciplines.ts`; the `SCALES` import map in `lib/og-palette.ts`; and the Radix scale import in `app/layout.tsx`. An architecture review will be tempted to consolidate these into one `DISCIPLINE_DEFS` record. **Don't** — it doesn't remove the friction, and adds to it.

Consolidating `HUE` / `LABEL` / `DISCIPLINE_ORDER` into one runtime record is possible and harmless, but the two structures that actually cause the "shotgun surgery" are **build-time imports keyed by hue that cannot be derived from a runtime record**:

- `og-palette`'s `SCALES` imports concrete Radix hex objects (`tomato`, `blue`, …) because satori (the OG-card renderer) can't read the app's CSS custom properties — it needs literal hexes at build time.
- `app/layout.tsx` imports each hue's Radix CSS scale so `var(--<hue>-N)` resolves at runtime — a static CSS import, not something a record can express.

So a `DISCIPLINE_DEFS` record would still require editing those two import sites by hand when a hue is added — it just adds a third place (the record) on top of the two it can't eliminate. The existing design already guards the gap: `og-palette` throws loudly at build if a hue has no imported scale, so an omission fails the build with a clear message rather than mis-rendering.

Disciplines also change rarely (the last change was the music + sound → audio merge and the photo removal). Low-frequency shotgun surgery, already caught by a build-time guard, isn't worth a consolidation that can't remove the import maps anyway.

Keep the split. `HUE` (`lib/disciplines.ts`) stays the single recolour point; when it names a new hue, add that hue's scale to `og-palette`'s `SCALES` and to `app/layout.tsx` (the build tells you if you forget).
