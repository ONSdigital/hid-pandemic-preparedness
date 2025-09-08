import type { Meta, StoryObj } from "@storybook/react";

import { ButtonArrow } from "./Button";

const directionOptions = {
  Left: "left",
  Right: "right",
};

const meta = {
  component: ButtonArrow,
  title: "Components/Button",
  argTypes: {
    ariaLabel: {
      table: {
        disable: true,
      },
    },
    direction: {
      control: { type: "select" },
      options: Object.values(directionOptions),
    },
    variant: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryArrowButtonStory = {
  args: {
    ariaLabel: "Arrow",
    disabled: false,
    direction: "right",
    selected: false,
    type: "button",
    variant: "primary",
  },
  name: "Arrow Primary",
} satisfies Story;

export const PrimaryInverseArrowButtonStory = {
  args: {
    ariaLabel: "Arrow",
    disabled: false,
    direction: "right",
    selected: false,
    type: "button",
    variant: "secondary",
  },
  name: "Arrow Secondary",
} satisfies Story;
