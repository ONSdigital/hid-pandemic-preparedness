import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Carousel from "./Carousel";
import CarouselCard from "../CarouselCard/CarouselCard";
import type { CarouselProps } from "./Carousel.interface";

const meta = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  title: "Components/Carousel",
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const numberOfCards = 5;

const sampleCards: ReactNode[] = Array.from({ length: numberOfCards }).map(
  (_, index) => (
    <CarouselCard
      key={index}
      title={`Sample Card Title ${index}`}
      body={`This is some sample body text for card ${index}.`}
    >
      <span role="img">ICON</span>
    </CarouselCard>
  ),
);

export const CarouselStory = {
  name: "Carousel",
  args: {
    children: sampleCards,
  },
} satisfies Story;
