/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules/**", "src/styles/bootstrap-5.3.8/**"],
    watch: false,
  },
  plugins: [tsconfigPaths()],
});
