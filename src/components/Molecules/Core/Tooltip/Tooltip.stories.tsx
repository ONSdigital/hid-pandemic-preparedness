import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";

const meta = {
  argTypes: {
    content: {
      table: {
        disable: true,
      },
    },
  },
  component: Tooltip,
  title: "Molecules/Core/Tooltip",
  parameters: {
    layout: "centered",
    controls: { disable: true },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const TooltipProps = {
  content: <span>Tooltip content</span>,
  triggerText: "Tooltip trigger",
};

export const PopoverStory = {
  name: "Tooltip",
  args: TooltipProps,
} satisfies Story;
