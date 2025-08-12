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
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/scss')],
    prependData: `
      @use "@/styles/root" as *;
      @use "@/styles/_mixins" as *;
    `,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default withMDX(nextConfig);
