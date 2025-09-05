import type { Meta, StoryObj } from "@storybook/react";

import { ListItem } from "./ListItem";

const meta = {
  component: ListItem,
  title: "Components/List-Item",
  argTypes: {},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListItemStory = {
  name: "List Item",
} satisfies Story;
