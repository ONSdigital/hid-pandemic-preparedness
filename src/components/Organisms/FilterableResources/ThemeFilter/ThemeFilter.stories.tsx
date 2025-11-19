import type { Meta, StoryObj } from "@storybook/react";

import { ThemeFilter } from "./ThemeFilter";
import themesJson from "./themes.json?raw";

const meta = {
  component: ThemeFilter,
  parameters: {
    layout: "centered",
  },
  title: "Organisms/FilterableResources/ThemeFilter",
} satisfies Meta<typeof ThemeFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeFilterStory = {
  args: { themes: JSON.parse(themesJson) },
  name: "ThemeFilter",
} satisfies Story;
