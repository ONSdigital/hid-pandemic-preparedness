import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RiArrowRightLine, RiMailLine } from "@remixicon/react";

import { Button } from "./Button";

// Defines some options for button children so we can show how different button content is rendered
interface ButtonChildrenOptions {
  TextOnly: ReactNode;
  IconLeft: ReactNode;
  IconLeftAndRight: ReactNode;
  IconRight: ReactNode;
}

const ButtonChildrenTextOnly: ReactNode = (
  <>
    <div>Button</div>
  </>
);

const ButtonChildrenIconLeft: ReactNode = (
  <>
    <div>
      <RiMailLine className="button__label-icon" />
    </div>
    <div>Button</div>
  </>
);

const ButtonChildrenIconLeftAndRight: ReactNode = (
  <>
    <div>
      <RiMailLine className="button__label-icon" />
    </div>
    <div>Button</div>
    <div>
      <RiArrowRightLine className="button__label-icon" />
    </div>
  </>
);

const ButtonChildrenIconRight: ReactNode = (
  <>
    <div>Button</div>
    <div>
      <RiArrowRightLine className="button__label-icon" />
    </div>
  </>
);

// Define your children options
const childrenOptions: ButtonChildrenOptions = {
  TextOnly: ButtonChildrenTextOnly,
  IconLeft: ButtonChildrenIconLeft,
  IconLeftAndRight: ButtonChildrenIconLeftAndRight,
  IconRight: ButtonChildrenIconRight,
};

const meta = {
  component: Button,
  title: "Components/Button",
  argTypes: {
    ariaLabel: {
      table: {
        disable: true,
      },
    },
    children: {
      control: { type: "select" },
      name: "Button content",
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
    },
    disabled: {
      control: { type: "boolean" },
      name: "Disabled",
    },
    selected: {
      name: "Selected",
    },
    type: {
      name: "Type",
    },
    variant: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButtonStory = {
  args: {
    ariaLabel: "Search",
    children: childrenOptions.IconLeftAndRight,
    disabled: false,
    selected: false,
    type: "button",
    variant: "primary",
  },
  name: "Primary",
} satisfies Story;

export const PrimaryInverseButtonStory = {
  args: {
    ariaLabel: "Search",
    children: childrenOptions.IconLeftAndRight,
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

export const SecondaryButtonStory = {
  args: {
    ariaLabel: "Search",
    children: childrenOptions.IconLeftAndRight,
    disabled: false,
    selected: false,
    type: "button",
    variant: "secondary",
  },

  name: "Secondary",
} satisfies Story;

export const SecondaryInverseButtonStory = {
  args: {
    ariaLabel: "Search",
    children: childrenOptions.IconLeftAndRight,
    disabled: false,
    selected: false,
    type: "button",
    variant: "secondary-inverse",
  },
  name: "Secondary inverse",
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Story;
