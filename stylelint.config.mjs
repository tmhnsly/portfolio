/**
 * Token gate — ENFORCES the no-magic-numbers rule that prose in CLAUDE.md kept
 * failing to. Forces the listed properties to use a design token (`var(--…)`) or an
 * allowed function/keyword; a raw literal is a build/commit error.
 *
 * Procedural cover-art (project thumbnails, BlogThumb, PixelMark) sizes and colours
 * from container-query units and fixed art values on purpose, so it's exempt — the
 * gate is for reusable UI, where every repeated value should be a named token.
 *
 * Scope is intentionally narrow: colours + font-weight are already 100% clean in the
 * UI, so locking them now is zero-risk. Widen in follow-up passes — letter-spacing
 * (needs a new caps token + a consolidate-or-add decision), font-size (split icon
 * sizes from text), z-index (global layers only; local stacking stays literal).
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
      ['/color$/', 'fill', 'stroke', 'font-weight'],
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
