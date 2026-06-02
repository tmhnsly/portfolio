import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  sassOptions: { includePaths: ['./src'] },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
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
