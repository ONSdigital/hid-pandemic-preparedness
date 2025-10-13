import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const mode = process.env.NODE_ENV;
const env = loadEnv(mode, process.cwd(), "");

const ASTRO_OUTPUT = env.ASTRO_OUTPUT || "static";

// If output is server use node adapter
const ASTRO_ADAPTER =
  ASTRO_OUTPUT == "server"
    ? node({
        mode: "middleware",
      })
    : undefined;

// If output is server set assets prefix to cdn base url if available
const ASTRO_ASSETS_PREFIX =
  ASTRO_OUTPUT == "server" ? env.PREVIEW_CDN_BASE_URL || undefined : undefined;

// If output is server set extra ssr vite config
const VITE_SSR =
  ASTRO_OUTPUT == "server"
    ? {
        // Need to add these as external dependencies as they could not be bundled as part of SSR build
        external: [
          "common-ancestor-path",
          "cssesc",
          "extend",
          "picomatch",
          "prismjs",
          "serverless-http",
        ],
        noExternal: true,
      }
    : undefined;

// https://astro.build/config
export default defineConfig({
  build: {
    assetsPrefix: ASTRO_ASSETS_PREFIX,
  },
  output: ASTRO_OUTPUT,
  adapter: ASTRO_ADAPTER,
  vite: {
    plugins: [tsconfigPaths()],
    build: {
      cssCodeSplit: false,
      cssTarget: "es2015",
    },
    css: {
      preprocessorOptions: {
        scss: {
          // need this until bootstrap is updated, see https://github.com/twbs/bootstrap/issues/40962
          quietDeps: true,
          silenceDeprecations: [
            "mixed-decls",
            "import",
            "color-functions",
            "global-builtin",
          ],
          verbose: false,
        },
      },
    },
    ssr: VITE_SSR,
  },
  integrations: [react()],
});
