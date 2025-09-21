import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
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
  },
  integrations: [react()],
});
