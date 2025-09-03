import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RiRecordCircleLine } from "@remixicon/react";

import CarouselCard from "./CarouselCard";
import type { CarouselCardProps } from "./CarouselCard.interface";

const meta = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  component: CarouselCard,
  title: "Components/CarouselCard",
} satisfies Meta<typeof CarouselCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const CarouselCardIcon: ReactNode = <RiRecordCircleLine />;

const carouselCardData: CarouselCardProps = {
  body: "A rumour report logs unverified claims or info in circulation.",
  children: CarouselCardIcon,
  title: "Rumour report",
};

export const CarouselCardStory = {
  name: "Carousel Card",
  args: carouselCardData,
} satisfies Story;
