import type { Meta, StoryObj } from "@storybook/react";

import { Theme } from "./Theme";
import themeJson from "./theme.json?raw";

const meta = {
  component: Theme,
  title: "Organisms/FilterableResources/Theme",
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof Theme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeStory = {
  name: "Theme",
  args: JSON.parse(themeJson),
} satisfies Story;
