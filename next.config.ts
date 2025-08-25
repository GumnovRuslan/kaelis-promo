import type { NextConfig } from "next";
// import createMDX from "@next/mdx";
import path from 'path';
import createNextIntlPlugin from "next-intl/plugin";

// const withMDX = createMDX({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [],
//     rehypePlugins: [],
//   },
// });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: 'standalone',
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      // Для localhost:3000
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      // Для cdn.sanity.io
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // Для kaelis.netlify.app
      {
        protocol: 'https',
        hostname: 'kaelis.netlify.app',
        pathname: '/**',
      },
    ],
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

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
