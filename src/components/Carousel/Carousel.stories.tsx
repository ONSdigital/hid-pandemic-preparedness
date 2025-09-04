import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Carousel from "./Carousel";
import CarouselCard from "../CarouselCard/CarouselCard";
import type { CarouselProps } from "./Carousel.interface";
import { Link } from "../Link/Link";
import { RiRhythmFill } from "@remixicon/react";

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

const carouselLinkComponent: ReactNode = (
  <Link href="/internal" label="Try now" />
);

const carouselCardIconComponent: ReactNode = <RiRhythmFill />;

const sampleCards: ReactNode[] = Array.from({ length: numberOfCards }).map(
  (_, index) => (
    <CarouselCard
      body={`This is some sample body text for card ${index}.`}
      iconComponent={carouselCardIconComponent}
      key={index}
      linkComponent={carouselLinkComponent}
      title={`Sample Card Title ${index}`}
    />
  ),
);

export const CarouselStory = {
  name: "Carousel",
  args: {
    children: sampleCards,
  },
} satisfies Story;
