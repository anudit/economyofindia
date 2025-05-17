import type { NextConfig } from "next";
import withPWA from "next-pwa";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	reactStrictMode: true,
	// output: "export",
	typescript: {
    ignoreBuildErrors: true,
  },
	poweredByHeader: false,
	trailingSlash: false,
	experimental: {
		optimizeCss: true,
		reactCompiler: true,
	},
	images: {
		unoptimized: true,
	},
};

// Configure next-pwa
const withPwaConfig = withPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
});

// Combine bundle-analyzer and next-pwa
export default withPwaConfig(withBundleAnalyzer(nextConfig));
