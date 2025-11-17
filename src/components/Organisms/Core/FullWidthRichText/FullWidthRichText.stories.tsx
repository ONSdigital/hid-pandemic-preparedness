import type { Meta, StoryObj } from "@storybook/react";

import { FullWidthRichText } from "./FullWidthRichText";
import fullWidthRichTextJson from "./full-width-rich-text.json?raw";

const meta = {
  component: FullWidthRichText,
  title: "Organisms/Core/FullWidthRichText",
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof FullWidthRichText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullWidthRichTextStory = {
  name: "FullWidthRichText",
  args: { ...JSON.parse(fullWidthRichTextJson) },
} satisfies Story;
