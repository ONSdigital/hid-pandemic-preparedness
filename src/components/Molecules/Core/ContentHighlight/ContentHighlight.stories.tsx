import type { Meta, StoryObj } from "@storybook/react";

import { ContentHighlight } from "./ContentHighlight";
import contentHighlightData from "./contentHighlight.json?raw";

const meta = {
  component: ContentHighlight,
  title: "Molecules/Core/ContentHighlight",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    _editable: {
      table: {
        disable: true,
      },
    },
    _uid: {
      table: {
        disable: true,
      },
    },
    component: {
      table: {
        disable: true,
      },
    },
    textarea: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ContentHighlight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContentHighlightStory = {
  name: "ContentHighlight",
  args: JSON.parse(contentHighlightData),
} satisfies Story;
