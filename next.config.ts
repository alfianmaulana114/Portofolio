import type { NextConfig } from "next";

// Helper to get Supabase hostname from env
function getSupabaseHostname(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    // Fallback to default Supabase hostname if env var not set (for build time)
    return 'eidjizjlczazdwlfkxbq.supabase.co';
  }
  try {
    return new URL(url).hostname;
  } catch {
    // Fallback if URL parsing fails
    return 'eidjizjlczazdwlfkxbq.supabase.co';
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Security: Use environment variable for Supabase storage domain
        hostname: getSupabaseHostname(),
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
