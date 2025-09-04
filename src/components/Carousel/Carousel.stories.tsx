import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Carousel from "./Carousel";
import { Link } from "../Link/Link";
import { RiRhythmFill } from "@remixicon/react";
import type { CarouselCardProps } from "../CarouselCard/CarouselCard.interface";

const meta = {
  argTypes: {
    carouselCardsData: {
      table: {
        disable: true,
      },
    },
  },
  component: Carousel,
  title: "Components/Carousel",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const numberOfCards = 16;

const carouselLinkComponent: ReactNode = (
  <Link href="/internal" label="Try now" />
);
const carouselCardIconComponent: ReactNode = <RiRhythmFill />;

// Create some example card data
const carouselCardsListData: CarouselCardProps[] = Array.from(
  { length: numberOfCards },
  (_, index) => ({
    body: "blah blah blah",
    title: `Example title ${index}`,
    iconComponent: carouselCardIconComponent,
    linkComponent: carouselLinkComponent,
  }),
);

export const CarouselStory = {
  name: "Carousel",
  args: {
    cardsPerPage: 3,
    carouselCardsData: carouselCardsListData,
  },
} satisfies Story;
