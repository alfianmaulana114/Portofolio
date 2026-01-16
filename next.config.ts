import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Security: Use environment variable or allow all Supabase storage domains
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL 
          ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname 
          : '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Meningkatkan batas ukuran upload menjadi 10MB
    },
  },
  // Security: Disable source maps in production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
