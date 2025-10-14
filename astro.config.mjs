import node from "@astrojs/node";
import react from "@astrojs/react";
import { storyblok } from "@storyblok/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import spaceData from "./src/content/spaces/me.json" assert { type: "json" };

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

// Storyblok API token
const STORYBLOK_ACCESS_TOKEN = env.STORYBLOK_ACCESS_TOKEN || undefined;

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

// Get space data for list of locales
let space = null;
const { data } = spaceData;
space = data?.space;

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
  integrations: [
    react(),
    storyblok({
      accessToken: STORYBLOK_ACCESS_TOKEN,
      // Set live preview to true if we're in the preview environment
      livePreview: ASTRO_OUTPUT == "server" ? true : false,
      apiOptions: {
        cache: {
          clear: "auto",
          type: "memory",
        },
      },
    }),
  ],
  i18n: {
    // Set locales from space if they are available
    locales: space ? ["en", ...space.language_codes] : ["en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
      fallbackType: "redirect",
    },
  },
});
