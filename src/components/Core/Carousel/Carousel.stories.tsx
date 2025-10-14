import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./Carousel";

import cardUnitDataRaw from "@content/cardUnitData.json";
import { CardUnit } from "../../CardUnit/CardUnit";
import type { CardUnitProps } from "../../CardUnit/CardUnit.interface";

const cardUnitData = cardUnitDataRaw as CardUnitProps[];

const meta = {
  component: Carousel,
  title: "Organisms/Core/Carousel",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const carouselItemsData = cardUnitData.map((cardUnitProps) => (
  <CardUnit key={cardUnitProps.id} {...cardUnitProps} />
));

export const CarouselStory = {
  name: "Carousel w/ Card Units",
  args: {
    carouselItems: carouselItemsData,
  },
} satisfies Story;
