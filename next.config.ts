import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  env: {
    RECAPTCHA_PUBLIC_KEY: "6Lf7hEcrAAAAADuAmNC1F2COT4P81KyAu7ckA1lZ",
  },
  images: {
    domains: ["external-content.duckduckgo.com"],
    loader: "default",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    return config;
  },
};

module.exports = nextConfig;
