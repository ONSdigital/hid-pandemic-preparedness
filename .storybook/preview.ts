import type { Preview } from "@storybook/react-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

import "../src/styles/index.scss";
import "../src/styles/bootstrap-5.3.8/dist/js/bootstrap.bundle";
import "@fontsource-variable/open-sans";

const customViewports = {
  desktop: {
    name: "Desktop 1440px",
    styles: {
      width: "1440px",
    },
    type: "desktop",
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      viewport: {
        options: {
          ...MINIMAL_VIEWPORTS,
          ...customViewports,
        },
      },
    },
  },
};

export default preview;
