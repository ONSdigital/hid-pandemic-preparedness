/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules/**", "src/styles/bootstrap-5.3.8/**"],
    watch: false,
  },
  resolve: {
    alias: {
      "/pagefind/pagefind.js": path.resolve(
        __dirname,
        "./src/mocks/pagefind.ts",
      ),
    },
  },
});
