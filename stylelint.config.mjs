/**
 * Token gate — ENFORCES the no-magic-numbers rule that prose in CLAUDE.md kept
 * failing to. Forces the listed properties to use a design token (`var(--…)`) or an
 * allowed function/keyword; a raw literal is a build/commit error.
 *
 * Procedural cover-art (project thumbnails, BlogThumb, PixelMark) sizes and colours
 * from container-query units and fixed art values on purpose, so it's exempt — the
 * gate is for reusable UI, where every repeated value should be a named token.
 *
 * Enforced: colours, font-weight, and letter-spacing (the latter swept onto the
 * --ls-* scale, adding --ls-caps / --ls-caps-wide and snapping near-duplicates).
 * font-size and z-index are intentionally NOT gated (see ADR-0004): font-size is
 * fluid clamp() + react-icon glyph dims (a control axis, not text) + contextual
 * em/rem, not a discrete text scale; z-index's global layers already use --z-*,
 * and the rest is local stacking that should stay literal.
 */
const config = {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-declaration-strict-value'],
  ignoreFiles: [
    'src/components/project-thumbs/**',
    'src/components/blog/BlogThumb/**',
    'src/components/ui/PixelMark/**',
  ],
  rules: {
    'scale-unlimited/declaration-strict-value': [
      ['/color$/', 'fill', 'stroke', 'font-weight', 'letter-spacing'],
      {
        ignoreValues: [
          'currentColor', 'transparent', 'inherit', 'unset', 'initial',
          'white', 'black', '#fff', '#000', 'normal', 'bold',
        ],
        ignoreFunctions: true,
        disableFix: true,
      },
    ],
  },
};

export default config;
