import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  component: Button,
  title: "Components/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory = {
  args: {
    disabled: false,
    selected: false,
  },

  name: "Button",
} satisfies Story;
