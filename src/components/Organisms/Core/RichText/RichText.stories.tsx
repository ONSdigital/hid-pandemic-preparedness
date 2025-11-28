import type { Meta, StoryObj } from "@storybook/react";

import { RichText } from "./RichText";
import richTextJson from "./rich-text.json?raw";

const meta = {
  component: RichText,
  title: "Organisms/Core/RichText",
  parameters: {
    layout: "centered",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof RichText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RichTextStory = {
  name: "RichText",
  args: { ...JSON.parse(richTextJson) },
} satisfies Story;
