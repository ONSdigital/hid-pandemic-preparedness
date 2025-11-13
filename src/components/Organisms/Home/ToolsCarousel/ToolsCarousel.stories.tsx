import type { Meta, StoryObj } from "@storybook/react";

import { ToolsCarousel } from "./ToolsCarousel";
import type { ToolsCarouselProps } from "./ToolsCarousel.interface";
import toolsCarouselData from "./toolsCarousel.json?raw";

const meta = {
  argTypes: {},
  component: ToolsCarousel,
  title: "Organisms/Home/ToolsCarousel",
} satisfies Meta<typeof ToolsCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToolsCarouselStory = {
  name: "ToolsCarousel",
  args: JSON.parse(toolsCarouselData),
} satisfies Story;
