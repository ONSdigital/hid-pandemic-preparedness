import type { Meta, StoryObj } from "@storybook/react";

import { ArrowButton } from "./ArrowButton";

const directionOptions = {
  Left: "left",
  Right: "right",
};

const meta = {
  component: ArrowButton,
  title: "Components/ArrowButton",
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
} satisfies Meta<typeof ArrowButton>;

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
  name: "Primary",
} satisfies Story;

export const PrimaryInverseArrowButtonStory = {
  args: {
    ariaLabel: "Arrow",
    disabled: false,
    direction: "right",
    selected: false,
    type: "button",
    variant: "primary-inverse",
  },
  name: "Primary inverse",
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Story;
