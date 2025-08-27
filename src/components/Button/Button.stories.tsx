import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { RiArrowRightLine, RiMailLine } from "@remixicon/react";

import { Button } from "./Button";

const meta = {
  component: Button,
  title: "Components/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const ButtonChildren: FC = () => (
  <>
    <div>
      <RiMailLine className="button__label__icon" />
    </div>
    <div>Button</div>
    <div>
      <RiArrowRightLine className="button__label__icon" />
    </div>
  </>
);

export const PrimaryButtonStory = {
  args: {
    ariaLabel: "Search",
    children: ButtonChildren,
    type: "button",
    variant: "primary",
  },
  name: "Primary",
} satisfies Story;

export const PrimaryInverseButtonStory = {
  args: {
    ariaLabel: "Search",
    children: ButtonChildren,
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
    children: ButtonChildren,
    type: "button",
    variant: "secondary",
  },

  name: "Secondary",
} satisfies Story;

export const SecondaryInverseButtonStory = {
  args: {
    ariaLabel: "Search",
    children: ButtonChildren,
    type: "button",
    variant: "secondary-inverse",
  },
  name: "Secondary inverse",
} satisfies Story;
