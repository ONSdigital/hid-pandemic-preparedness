import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { CardUnit } from "./CardUnit";
import type { CardUnitProps } from "./CardUnit.interface";

// Defines some options for icons so we can show how different icons are rendered
// interface IconOptions {
//   Calculator: string;
//   Dashboard: string;
//   QuestionBank: string;
//   Report: string;
// }

// const iconOptions: IconOptions = {
//   Calculator: "calculator",
//   Dashboard: "dashboard",
//   QuestionBank: "questionbank",
//   Report: "report",
// };

const meta = {
  component: CardUnit,
  title: "Components/Cards/CardUnit",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    id: {
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
} satisfies Meta<typeof CardUnit>;

export default meta;
type Story = StoryObj<typeof meta>;

const cardUnitProps: CardUnitProps = {
  id: uuidv4(),
  link: {
    href: "/",
    label: "Basic Data Visualisation",
  },
  subTitle: "Using 7-1-7 to Strengthen Uganda’s Health Security.",
  tags: [
    {
      title: "Theme",
      type: "secondary",
    },
    {
      title: "Leve",
      type: "primary",
    },
  ],
  readingTime: "3 min",
};

export const CardUnitStory = {
  args: cardUnitProps,
  name: "CardUnit",
} satisfies Story;
