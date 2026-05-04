import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@hogar/shared', '@hogar/database'],
};

export default nextConfig;
