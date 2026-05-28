import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,

	poweredByHeader: false,
	trailingSlash: false,
	experimental: {
		optimizeCss: true,
	},
	reactCompiler: true,
	images: {
		unoptimized: true,
	},
	async rewrites() {
		return [
			{
				source: "/llms.txt",
				destination: "/api/llm",
			},
		];
	},
};

export default nextConfig;
