import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  sassOptions: { includePaths: ['./src'] },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
};
export default nextConfig;
