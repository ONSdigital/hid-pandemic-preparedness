import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  build: {
    assetsPrefix: "https://d8sn29szhcb2a.cloudfront.net/client",
  },
  output: "server",
  adapter: node({
    mode: "middleware",
  }),
  vite: {
    plugins: [tsconfigPaths()],
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
    ssr: {
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
    },
  },
  integrations: [react()],
});
