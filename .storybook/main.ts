import type { StorybookConfig } from "@storybook/react-vite";
import viteTsconfig from "vite-tsconfig-paths";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [viteTsconfig()],
      css: {
        preprocessorOptions: {
          scss: {
            // need this until bootstrap is updated, see https://github.com/twbs/bootstrap/issues/40962
            quietDeps: true,
            silenceDeprecations: [
              "import",
              "color-functions",
              "global-builtin",
            ],
            verbose: false,
          },
        },
      },
    });
  },
};
export default config;
