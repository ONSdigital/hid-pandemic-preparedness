import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";

const meta = {
  component: Carousel,
  title: "Organisms/Core/Carousel",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CarouselStory = {
  name: "Carousel",
} satisfies Story;
