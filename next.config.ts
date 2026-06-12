import type { NextConfig } from 'next';

/**
 * Content-Security-Policy, built from a directives map for legibility.
 *
 * `script-src`/`style-src` keep `'unsafe-inline'` on purpose: this is a
 * statically-generated Next app, so Next emits inline bootstrap/flight scripts
 * (and next/font + critical CSS emit inline styles) with no request-time nonce
 * to whitelist. A nonce-based strict CSP would require a middleware that runs on
 * every request, which would opt every route out of static generation. The XSS
 * surface that buys back is small here: the only inline script we author is the
 * static pre-paint theme script, and markdown is rendered by react-markdown with
 * raw HTML disabled (no rehype-raw), so untrusted content can't inject markup.
 *
 * Everything else is locked to `'self'` plus the exact third-party origins the
 * site actually loads: YouTube embeds (youtube-nocookie) and their thumbnails
 * (i.ytimg.com). Fonts are self-hosted by next/font, so `font-src 'self'`.
 */
const csp = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'blob:', 'https://i.ytimg.com'],
  'font-src': ["'self'"],
  'connect-src': ["'self'"],
  'media-src': ["'self'", 'blob:'],
  'frame-src': ['https://www.youtube-nocookie.com'],
  'worker-src': ["'self'", 'blob:'],
  'manifest-src': ["'self'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'object-src': ["'none'"],
  'upgrade-insecure-requests': [],
};
const cspValue = Object.entries(csp)
  .map(([directive, sources]) => (sources.length ? `${directive} ${sources.join(' ')}` : directive))
  .join('; ');

/**
 * Security response headers, applied to every route. Together these block
 * clickjacking (XFO + frame-ancestors), MIME sniffing, base-tag and form-action
 * hijacking, plugin embedding, cross-origin window tampering (COOP), referrer
 * leakage, and powerful-feature access, force HTTPS (HSTS, preload-eligible),
 * and constrain where every resource may load from (CSP).
 */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()' },
  { key: 'Content-Security-Policy', value: cspValue },
];

const nextConfig: NextConfig = {
  sassOptions: { includePaths: ['./src'] },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // The old per-discipline routes were merged/retired (music + sound → audio;
  // photo dropped). Keep any shared links working.
  async redirects() {
    return [
      { source: '/music', destination: '/audio', permanent: true },
      { source: '/music/:slug', destination: '/audio/:slug', permanent: true },
      { source: '/sound', destination: '/audio', permanent: true },
      { source: '/sound/:slug', destination: '/audio/:slug', permanent: true },
      { source: '/photo', destination: '/', permanent: true },
      { source: '/photo/:slug', destination: '/', permanent: true },
      // Renamed pieces → their new slug (the /sound,/music wildcards above already
      // funnel the old-discipline prefixes into /audio, so keying on the post-merge
      // path catches both). Deleted placeholder projects/posts are intentionally left
      // to 404 — redirecting removed content to home would be a soft-404.
      { source: '/audio/hands-ad-sound-replacement', destination: '/audio/the-phaeton', permanent: true },
      { source: '/audio/the-pine-in-the-ash', destination: '/audio/pine-in-the-ash', permanent: true },
      { source: '/video/stand-up', destination: '/video/party-lines', permanent: true },
    ];
  },
};
export default nextConfig;
