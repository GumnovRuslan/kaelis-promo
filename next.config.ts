import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from 'path';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost:3000', 'cdn.sanity.io'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/scss')],
    additionalData: `
      @use "@/styles/_mixins" as *;
      @use "@/styles/_functions" as *;
    `,
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default withMDX(nextConfig);
