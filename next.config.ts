import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["storage.googleapis.com"],
  },
  // Add this section below
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
