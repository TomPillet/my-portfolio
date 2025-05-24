import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  env: {
    EMAILJS_SERVICE_ID: process.env.EMAILJS_CONTACT_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_CONTACT_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
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
