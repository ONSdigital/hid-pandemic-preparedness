import type { Meta, StoryObj } from "@storybook/react";
import { Reference } from "./Reference";

import referencesDataRaw from "./reference.json?raw";

const meta = {
  component: Reference,
  title: "Molecules/Core/Reference",
  parameters: {
    layout: "centered",
    controls: { disable: true },
  },
  argTypes: {},
} satisfies Meta<typeof Reference>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PopoverStory = {
  name: "Reference",
  args: JSON.parse(referencesDataRaw),
} satisfies Story;
