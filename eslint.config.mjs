import next from "eslint-config-next";

const config = [
  // Ignore build artifacts + legacy bundles
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      // legacy SPA code (kept for reference, not shipped by Next app router)
      "src/pages/**",
      "src/components/**",
    ],
  },
  ...next,
];

export default config;
