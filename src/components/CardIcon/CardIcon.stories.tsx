import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { CardIcon } from "./CardIcon";
import type { CardIconProps } from "./CardIcon.interface";

// Defines some options for icons so we can show how different icons are rendered
interface IconOptions {
  Calculator: string;
  Dashboard: string;
  QuestionBank: string;
  Report: string;
}

const iconOptions: IconOptions = {
  Calculator: "calculator",
  Dashboard: "dashboard",
  QuestionBank: "questionbank",
  Report: "report",
};

const meta = {
  component: CardIcon,
  title: "Components/CardIcon",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: { type: "select" },
      name: "Icon display",
      options: Object.keys(iconOptions),
      mapping: iconOptions,
    },
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
} satisfies Meta<typeof CardIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

const cardIconProps: CardIconProps = {
  id: uuidv4(),
  icon: "dashboard",
  title: "Rumour report",
  subTitle: "A rumour report logs unverified claims or info in circulation.",
  link: {
    href: "/",
    label: "Try now",
  },
};

export const CardIconStory = {
  args: cardIconProps,
  name: "CardIcon",
} satisfies Story;
