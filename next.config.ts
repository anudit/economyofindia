import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  poweredByHeader: false,
  trailingSlash: false,
  experimental: {
    turbo: {},
    optimizeCss: true,
    reactCompiler: true,
    // mdxRs: true,
  },
  images: {
    unoptimized: true,
  },
};

export default withBundleAnalyzer(nextConfig);
