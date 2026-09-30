import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    unoptimized: true,
  },
};

export default createMDX()(nextConfig);
