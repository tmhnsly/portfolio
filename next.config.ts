import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  sassOptions: { includePaths: ['./src'] },
  images: { formats: ['image/avif', 'image/webp'] },
};
export default nextConfig;
