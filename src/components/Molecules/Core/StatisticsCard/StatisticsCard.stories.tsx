import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { CardStat } from "./StatisticsCard";
import type { CardStatProps } from "./StatisticsCard.interface";

const meta = {
  component: CardStat,
  title: "Components/Cards/CardStat",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    image: {
      table: {
        disable: true,
      },
    },
    link: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof CardStat>;

export default meta;
type Story = StoryObj<typeof meta>;

const cardStatProps: CardStatProps = {
  id: uuidv4(),
  title: "14.8 million+",
  subTitle: "Deaths from all respiratory disease 1980-2021.",
  link: {
    href: "/",
    label: "2",
  },
  image: {
    id: uuidv4(),
    altText: "Bar chart showing deaths from all respiritory disease.",
    srcPath: "./images/plots/stacked-bar-chart.svg",
  },
};

export const CardStatStory = {
  args: cardStatProps,
  name: "CardStat",
} satisfies Story;
