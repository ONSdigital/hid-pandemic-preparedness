import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { Tip } from "./Tip";

const meta = {
  component: Tip,
  title: "Molecules/Core/Tip",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    _uid: {
      table: {
        disable: true,
      },
    },
    component: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Tip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TipStory = {
  name: "Tip",
  args: {
    _uid: uuidv4(),
    component: "Tip",
    text: "If you're surveying students or children, check the specific demographic themes tailored to those groups.",
  },
} satisfies Story;
