/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules/**"],
    watch: false,
  },
  resolve: {
    alias: {
      // avoids vitest compilation error in pipeline when pagefind module cannot be found as it is runtime-only
      "/pagefind/pagefind.js": path.resolve(
        __dirname,
        "./src/mocks/pagefind.ts",
      ),
    },
  },
});
