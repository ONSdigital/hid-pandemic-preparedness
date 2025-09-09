import type { Preview } from "@storybook/react-vite";

import "../src/styles/index.scss";
import "../src/styles/bootstrap-5.3.8/dist/js/bootstrap.bundle";
import "@fontsource-variable/open-sans";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
