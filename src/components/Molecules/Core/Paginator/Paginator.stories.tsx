import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { Paginator } from "./Paginator";

const meta = {
  component: Paginator,
  title: "Molecules/Core/Paginator",
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on.*" }, 
  },
  argTypes: {
    totalPages: { control: { type: "number", min: 0, max: 20 } },
    currentPage: { control: { type: "number", min: 0, max: 20 } },
  },
} satisfies Meta<typeof Paginator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ItemMode: Story = {
  name: "Item Mode (CMS)",
  args: {
    ariaLabel: "CMS page navigation",
    items: Array.from({ length: 7 }, () => ({ _uid: uuidv4() })),
  },
};

export const NumericMode: Story = {
  name: "Numeric Mode (Search)",
  args: {
    ariaLabel: "Search results navigation",
    totalPages: 15,
    currentPage: 0, // Start at page 1 (index 0)
  },
};

export const ManyPages: Story = {
  name: "Numeric Mode (Many Pages)",
  args: {
    ariaLabel: "Large dataset navigation",
    totalPages: 50,
    currentPage: 24, // Start in the middle
  },
};