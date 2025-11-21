import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { Formula } from "./Formula";

const meta = {
  component: Formula,
  title: "Molecules/Core/Formula",
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
} satisfies Meta<typeof Formula>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormulaStory = {
  name: "Formula",
  args: {
    _uid: uuidv4(),
    component: "Formula",
    text: "Mₖ = (dₖ / pₖ) × 1,000",
  },
} satisfies Story;
