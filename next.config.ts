import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["informatica03", "10.0.0.152", "localhost"],
  typescript: {
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
