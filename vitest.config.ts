/// <reference types="vitest" />
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules/**", "src/styles/bootstrap-5.3.8/**"],
    watch: false,
  },
});
