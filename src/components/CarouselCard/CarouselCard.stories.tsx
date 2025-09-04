import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RiRecordCircleLine } from "@remixicon/react";

import CarouselCard from "./CarouselCard";
import type { CarouselCardProps } from "./CarouselCard.interface";
import { Link } from "../Link/Link";

const meta = {
  argTypes: {
    iconComponent: {
      table: {
        disable: true,
      },
    },
    linkComponent: {
      table: {
        disable: true,
      },
    },
  },
  component: CarouselCard,
  parameters: {
    layout: "centered",
  },
  title: "Components/CarouselCard",
} satisfies Meta<typeof CarouselCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const carouselCardIconComponent: ReactNode = <RiRecordCircleLine />;
const carouselLinkComponent: ReactNode = (
  <Link href="/internal" label="Try now" />
);

const carouselCardData: CarouselCardProps = {
  body: "A rumour report logs unverified claims or info in circulation.",
  iconComponent: carouselCardIconComponent,
  linkComponent: carouselLinkComponent,
  title: "Rumour report",
};

export const CarouselCardStory = {
  name: "Carousel Card",
  args: carouselCardData,
} satisfies Story;
