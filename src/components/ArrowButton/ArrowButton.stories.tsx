import type { Meta, StoryObj } from "@storybook/react";

import { ArrowButton } from "./ArrowButton";

const meta = {
  component: ArrowButton,
  title: "Components/ArrowButton",
  argTypes: {
    ariaLabel: {
      table: {
        disable: true,
      },
    },
    variant: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ArrowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryArrowButtonStory = {
  args: {
    ariaLabel: "Arrow",
    disabled: false,
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
    selected: false,
    type: "button",
    variant: "primary-inverse",
  },
  name: "Primary inverse",
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Story;
