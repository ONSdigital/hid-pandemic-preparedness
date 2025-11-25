import type { Meta, StoryObj } from "@storybook/react";

import { CardUnit } from "./CardUnit";
import type { CardUnitProps } from "./CardUnit.interface";
import cardUnitData from "./cardUnit.json?raw";

const meta = {
  component: CardUnit,
  title: "Molecules/Core/CardUnit",
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
        disable: false, // allow table to show
      },
      // Nested properties
      label: {
        control: "text", // user can edit the label
      },
      url: {
        table: {
          disable: true, // hide other properties
        },
      },
    },
    tags: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof CardUnit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardUnitStory = {
  args: JSON.parse(cardUnitData) as CardUnitProps,
  name: "CardUnit",
} satisfies Story;
