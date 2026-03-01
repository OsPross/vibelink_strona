import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Omijamy ostrzeżenia ESLinta podczas budowania na Vercelu
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Omijamy twarde błędy TypeScriptu (szczególnie te z framer-motion)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;