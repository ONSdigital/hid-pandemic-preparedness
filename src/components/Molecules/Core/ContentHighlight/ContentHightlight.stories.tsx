import type { Meta, StoryObj } from "@storybook/react";

import { ContentHighlight } from "./ContentHighlight";

const meta = {
  component: ContentHighlight,
  title: "Molecules/Core/ContentHighlight",
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof ContentHighlight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContentHighlightStory = {
  name: "ContentHighlight",
} satisfies Story;
