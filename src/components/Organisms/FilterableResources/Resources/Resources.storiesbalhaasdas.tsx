import type { Meta, StoryObj } from "@storybook/react";

import { Resources } from "./Resources";
import resourcesJson from "./resources.json?raw";

const meta = {
  component: Resources,
  title: "Organisms/FilterableResources/Resources",
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof Resources>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResourcesStory = {
  name: "Resources",
  args: JSON.parse(resourcesJson),
} satisfies Story;
