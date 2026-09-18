import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jaswanth-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;