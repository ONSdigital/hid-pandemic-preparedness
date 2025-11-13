import type { Meta, StoryObj } from "@storybook/react";

import { ToolsCarousel } from "./ToolsCarousel";
import type { ToolsCarouselProps } from "./ToolsCarousel.interface";
import toolsCarouselData from "./toolsCarousel.json";

const meta = {
  argTypes: {
    _uid: { table: { disable: true } },
    Carousel: { table: { disable: true } },
    link: { table: { disable: true } },
    _editable: { table: { disable: true } },
  },
  component: ToolsCarousel,
  title: "Organisms/Home/ToolsCarousel",
} satisfies Meta<typeof ToolsCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToolsCarouselStory = {
  name: "ToolsCarousel",
  args: { ...(toolsCarouselData as ToolsCarouselProps) },
} satisfies Story;
