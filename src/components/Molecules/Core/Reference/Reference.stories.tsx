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
} satisfies Meta<typeof Reference>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReferenceStory = {
  name: "Reference",
  args: JSON.parse(referencesDataRaw),
} satisfies Story;
