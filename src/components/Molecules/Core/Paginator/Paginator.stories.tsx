import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { Paginator } from "./Paginator";
import type { PaginatorProps } from "./Paginator.interface";

const meta = {
  component: Paginator,
  title: "Molecules/Core/Paginator",
  parameters: {
    layout: "centered",
  },
  args: { onSelect: fn() },
} satisfies Meta<typeof Paginator>;

export default meta;
type Story = StoryObj<typeof meta>;

const paginatorProps: PaginatorProps = {
  ariaLabel: "Storybook test page navigation",
  perPage: 10,
  // Create 100 items
  items: Array.from({ length: 7 }, () => ({ _uid: uuidv4() })),
};

export const PaginatorStory = {
  name: "Paginator",
  args: paginatorProps,
} satisfies Story;
