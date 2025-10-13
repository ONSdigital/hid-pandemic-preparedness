/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vitest/config";


export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules/**", "src/styles/bootstrap-5.3.8/**"],
    watch: false,
  },
});
