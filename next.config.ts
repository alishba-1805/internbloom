import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stops "next dev" from adding extra instruction files to the project
  agentRules: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
