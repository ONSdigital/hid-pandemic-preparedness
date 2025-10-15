import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";

import carouselData from "./carousel.json";

const meta = {
  component: Carousel,
  title: "Organisms/Core/Carousel",
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CarouselStory = {
  name: "Tool Cards",
  args: carouselData,
} satisfies Story;
