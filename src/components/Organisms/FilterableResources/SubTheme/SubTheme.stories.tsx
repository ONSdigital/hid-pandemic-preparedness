import type { Meta, StoryObj } from "@storybook/react";

import { SubTheme } from "./SubTheme";
import type { SubThemeProps } from "./SubTheme.interface";
import subThemeJson from "./subTheme.json?raw";

const meta = {
  component: SubTheme,
  title: "Organisms/FilterableResources/SubTheme",
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof SubTheme>;

export default meta;
type Story = StoryObj<typeof meta>;

// Add `parentTheme` in addition to data from Storyblok to form props
const subThemeProps: SubThemeProps = {
  ...JSON.parse(subThemeJson),
  parentTheme: "Demographic information",
};

export const SubThemeStory = {
  name: "SubTheme",
  args: subThemeProps,
} satisfies Story;
