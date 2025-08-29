import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RiArrowRightLine, RiMailLine } from "@remixicon/react";

import { Button } from "./Button";

// Defines some options for button children so we can show how different button content is rendered
interface ButtonChildrenOptions {
  TextOnly: FC;
  IconLeft: FC;
  IconLeftAndRight: FC;
  IconRight: FC;
}

const ButtonChildrenTextOnly: FC = () => <div>Button</div>;

const ButtonChildrenIconLeft: FC = () => (
  <>
    <div>
      <RiMailLine className="button__label-icon" />
    </div>
    <div>Button</div>
  </>
);

const ButtonChildrenIconLeftAndRight: FC = () => (
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

const ButtonChildrenIconRight: FC = () => (
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

const renderWithChildren = (args: any) => {
  // Get the component type from childrenOptions using the string key
  const ChildComponent =
    childrenOptions[args.children as keyof ButtonChildrenOptions];
  return (
    <Button {...args}>
      <ChildComponent />
    </Button>
  );
};

export const PrimaryButtonStory = {
  args: {
    ariaLabel: "Search",
    children: "IconLeftAndRight",
    disabled: false,
    selected: false,
    type: "button",
    variant: "primary",
  },
  render: renderWithChildren,
  name: "Primary",
} satisfies Story;

export const PrimaryInverseButtonStory = {
  args: {
    ariaLabel: "Search",
    children: "IconLeftAndRight",
    disabled: false,
    selected: false,
    type: "button",
    variant: "primary-inverse",
  },
  render: renderWithChildren,
  name: "Primary inverse",
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Story;

export const SecondaryButtonStory = {
  args: {
    ariaLabel: "Search",
    children: "IconLeftAndRight",
    disabled: false,
    selected: false,
    type: "button",
    variant: "secondary",
  },
  render: renderWithChildren,
  name: "Secondary",
} satisfies Story;

export const SecondaryInverseButtonStory = {
  args: {
    ariaLabel: "Search",
    children: "IconLeftAndRight",
    disabled: false,
    selected: false,
    type: "button",
    variant: "secondary-inverse",
  },
  render: renderWithChildren,
  name: "Secondary inverse",
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Story;
