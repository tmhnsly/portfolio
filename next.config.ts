import type { NextConfig } from 'next';

/**
 * Security response headers, applied to every route. The CSP is limited to
 * directives that DON'T need a per-request nonce or per-build hash: a strict
 * script-src/style-src isn't feasible on a statically-generated Next app (Next
 * emits inline bootstrap/flight scripts with no request-time nonce to whitelist),
 * so locking those would break hydration. What's here still blocks clickjacking,
 * base-tag and form-action hijacking, plugin embedding, and forces HTTPS.
 */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()' },
  {
    key: 'Content-Security-Policy',
    value: "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests",
  },
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
    ];
  },
};
export default nextConfig;
