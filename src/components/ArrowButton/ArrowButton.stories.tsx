import type { Meta, StoryObj } from "@storybook/react";

import { ArrowButton } from "./ArrowButton";

const directionOptions = {
  Left: "left",
  Right: "right",
};

const meta = {
  component: ArrowButton,
  title: "Components/Buttons/ArrowButton",
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
    onClick: {
      table: {
        disable: true,
      },
    },
    selected: {
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

export const SecondaryArrowButtonStory = {
  args: {
    ariaLabel: "Arrow",
    disabled: false,
    direction: "right",
    selected: false,
    type: "button",
    variant: "secondary",
  },
  name: "Secondary",
} satisfies Story;

export const InverseArrowButtonStory = {
  args: {
    ariaLabel: "Arrow",
    disabled: false,
    direction: "right",
    selected: false,
    type: "button",
    variant: "inverse",
  },
  name: "Inverse",
} satisfies Story;
