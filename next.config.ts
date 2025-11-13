import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

// Only apply PWA config in production builds to avoid Turbopack/webpack conflict
let config = nextConfig;

if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    buildExcludes: [/app-build-manifest\.json$/],
  });
  config = withPWA(nextConfig);
}

export default config;
