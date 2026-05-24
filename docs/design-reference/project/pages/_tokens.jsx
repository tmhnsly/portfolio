// Design tokens — Radix-derived. Primary accent = teal. Mono = Space Mono.
// All pages reference these via window.TOKENS, window.DISCIPLINES_T etc.

// ----- Color tokens (semantic, mode-aware) ----------------------------------
const TOKENS_LIGHT = {
  // Surfaces
  bg:           '#f0ece2',
  bgSubtle:     '#ebe6d8',
  surface:      'rgba(255,253,247,0.78)',
  surfaceSoft:  'rgba(255,253,247,0.55)',
  surfaceEdge:  'rgba(255,255,255,0.85)',

  // Text
  text:         '#1c1b18',
  textMid:      'rgba(28,27,24,0.78)',
  textSoft:     'rgba(28,27,24,0.62)',
  textMuted:    'rgba(28,27,24,0.42)',
  textOnAccent: '#ffffff',

  // Borders / rules
  ruleSoft:     'rgba(28,27,24,0.12)',
  rule:         'rgba(28,27,24,0.24)',
  ruleStrong:   'rgba(28,27,24,0.36)',

  // Primary accent — Radix tomato 9 / 10 / 4
  accent:        '#e54d2e',
  accentHover:   '#dd4425',
  accentSubtle:  '#ffdcd3',
  accentGlow:    'rgba(229,77,46,0.22)',

  // Discipline accents (Radix step 9)
  disciplineCode:  '#e54d2e',  // tomato
  disciplineMusic: '#3e63dd',  // indigo
  disciplineSound: '#5b5bd6',  // iris
  disciplinePhoto: '#ad7f58',  // brown
  disciplineVideo: '#00a2c7',  // cyan
  disciplineBlog:  '#46a758',  // grass

  // Shadows
  shadowSm:     '0 4px 12px rgba(28,27,24,0.06)',
  shadowMd:     '0 12px 30px rgba(28,27,24,0.08)',
  shadowLg:     '0 22px 50px rgba(28,27,24,0.14)',
  shadowXl:     '0 36px 70px rgba(28,27,24,0.20)',

  // Type (so legacy `t.mono` / `t.display` references resolve to Space Mono / Grotesk)
  display: '"Space Grotesk", -apple-system, sans-serif',
  mono:    '"Space Mono", "JetBrains Mono", ui-monospace, monospace',
};

const TOKENS_DARK = {
  bg:           '#161615',
  bgSubtle:     '#1c1c1a',
  surface:      'rgba(40,40,38,0.65)',
  surfaceSoft:  'rgba(28,28,26,0.55)',
  surfaceEdge:  'rgba(255,255,255,0.08)',

  text:         '#ededec',
  textMid:      'rgba(237,237,236,0.78)',
  textSoft:     'rgba(237,237,236,0.62)',
  textMuted:    'rgba(237,237,236,0.42)',
  textOnAccent: '#ffffff',

  ruleSoft:     'rgba(255,255,255,0.08)',
  rule:         'rgba(255,255,255,0.16)',
  ruleStrong:   'rgba(255,255,255,0.32)',

  accent:        '#e54d2e',
  accentHover:   '#ec6142',
  accentSubtle:  '#4e1511',
  accentGlow:    'rgba(229,77,46,0.30)',

  disciplineCode:  '#e54d2e',
  disciplineMusic: '#3e63dd',
  disciplineSound: '#5b5bd6',
  disciplinePhoto: '#ad7f58',
  disciplineVideo: '#00a2c7',
  disciplineBlog:  '#46a758',

  shadowSm:     '0 4px 12px rgba(0,0,0,0.18)',
  shadowMd:     '0 12px 30px rgba(0,0,0,0.28)',
  shadowLg:     '0 22px 50px rgba(0,0,0,0.40)',
  shadowXl:     '0 36px 70px rgba(0,0,0,0.55)',

  display: '"Space Grotesk", -apple-system, sans-serif',
  mono:    '"Space Mono", "JetBrains Mono", ui-monospace, monospace',
};

// Discipline gradient + swatch table
const DISCIPLINES_T = {
  code:  { label:'Code',  color:'#e54d2e', grad:'linear-gradient(135deg, #ec8e7b, #5c271f)', swatches:['#fdbdaf','#e54d2e','#5c271f'] },
  music: { label:'Music', color:'#3e63dd', grad:'linear-gradient(135deg, #5072e4, #1f2d5c)', swatches:['#7d96e8','#3e63dd','#1f2d5c'] },
  sound: { label:'Sound', color:'#5b5bd6', grad:'linear-gradient(135deg, #6e6ade, #2a2570)', swatches:['#9b8cf2','#5b5bd6','#2f265f'] },
  photo: { label:'Photo', color:'#ad7f58', grad:'linear-gradient(135deg, #c8a17a, #4a3526)', swatches:['#d6b48a','#ad7f58','#4a3526'] },
  video: { label:'Video', color:'#00a2c7', grad:'linear-gradient(135deg, #4cb9d4, #0a3344)', swatches:['#7fd3e5','#00a2c7','#0a3344'] },
  blog:  { label:'Blog',  color:'#46a758', grad:'linear-gradient(135deg, #5db66b, #1c3f23)', swatches:['#94d4a0','#46a758','#1c3f23'] },
};

// ----- Typography scale ----------------------------------------------------
const TYPE = {
  display: '"Space Grotesk", -apple-system, sans-serif',
  mono:    '"Space Mono", "JetBrains Mono", ui-monospace, monospace',

  size: {
    displayXXL: 156, displayXL: 120, displayL: 72, display: 56,
    h1: 42, h2: 28, h3: 22, h4: 18,
    bodyL: 19, body: 16, bodyS: 14, caption: 13,
    mono: 12, monoS: 11, monoXS: 10,
  },
  weight:   { regular:400, medium:500, semibold:600 },
  ls: {
    displayXXL: '-0.045em', displayXL: '-0.04em', displayL: '-0.04em', display: '-0.035em',
    h1: '-0.03em', h2: '-0.025em', h3: '-0.02em',
    body: '-0.005em', mono: '0.02em', monoEyebrow: '0.14em',
  },
  lineHeight: { display: 0.92, heading: 1.15, body: 1.55, mono: 1.6 },
};

// ----- Spacing scale (4px base) --------------------------------------------
const SPACE = {
  0:0, 1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 7:32,
  8:40, 9:48, 10:56, 11:64, 12:80, 13:96, 14:128,
};

// ----- Radius scale --------------------------------------------------------
const RADIUS = { xs:4, sm:6, md:8, lg:10, xl:14, '2xl':18, '3xl':24, full:999 };

// ----- Expose -------------------------------------------------------------
window.TOKENS = { light: TOKENS_LIGHT, dark: TOKENS_DARK };
window.DISCIPLINES_T = DISCIPLINES_T;
window.TYPE = TYPE;
window.SPACE = SPACE;
window.RADIUS = RADIUS;

window.getTokens = function getTokens(mode) {
  return mode === 'dark' ? TOKENS_DARK : TOKENS_LIGHT;
};
