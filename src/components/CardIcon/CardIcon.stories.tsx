import {
  RiDashboardLine,
  RiGroupLine,
  RiQuestionLine,
  RiRhythmFill,
} from "@remixicon/react";
import type { Meta, StoryObj } from "@storybook/react";

import type { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import { CardIcon } from "./CardIcon";
import type { CardIconProps } from "./CardIcon.interface";

// Defines some options for icons so we can show how different icons are rendered
interface IconOptions {
  Calculator: ReactNode;
  Dashboard: ReactNode;
  QuestionBank: ReactNode;
  Report: ReactNode;
}

const iconOptions: IconOptions = {
  Calculator: <RiRhythmFill />,
  Dashboard: <RiDashboardLine />,
  QuestionBank: <RiQuestionLine />,
  Report: <RiGroupLine />,
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
  },
} satisfies Meta<typeof CardIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

const cardIconProps: CardIconProps = {
  id: uuidv4(),
  icon: iconOptions.Report,
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
