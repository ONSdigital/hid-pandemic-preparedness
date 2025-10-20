import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { ToolCard } from "./ToolCard";
import type { ToolCardProps } from "./ToolCard.interface";

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
  component: ToolCard,
  title: "Components/Cards/ToolCard",
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
} satisfies Meta<typeof ToolCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const toolCardProps: ToolCardProps = {
  id: uuidv4(),
  icon: "dashboard",
  title: "Rumour report",
  subTitle: "A rumour report logs unverified claims or info in circulation.",
  link: {
    id: "e26bc65c-c83e-4d04-a5da-114fec6ce123",
    rel: "",
    url: "/",
    title: "Try now",
    linktype: "story",
    fieldtype: "multilink",
    cached_url: "home",
  },
};

export const ToolCardStory = {
  args: toolCardProps,
  name: "ToolCard",
} satisfies Story;
