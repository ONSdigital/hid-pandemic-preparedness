import type { Meta, StoryObj } from "@storybook/react";

import { Paginator } from "./Paginator";

const meta = {
  component: Paginator,
  title: "Molecules/Core/Paginator",
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on.*" },
  },
  args: {
    onPageChange: (pageIndex) => console.log("Page changed to:", pageIndex),
  },
  argTypes: {
    totalPages: { control: { type: "number", min: 0, max: 50 } },
    currentPage: { control: { type: "number", min: 0, max: 50 } },
  },
} satisfies Meta<typeof Paginator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  name: "Standard (Few Pages)",
  args: {
    ariaLabel: "Standard navigation",
    totalPages: 5,
    currentPage: 0,
  },
};

export const MiddlePage: Story = {
  name: "Middle of Range",
  args: {
    ariaLabel: "Search results navigation",
    totalPages: 15,
    currentPage: 7,
  },
};

export const LastPage: Story = {
  name: "Last Page",
  args: {
    ariaLabel: "Large dataset navigation",
    totalPages: 50,
    currentPage: 49,
  },
};

export const MobileViewSimulator: Story = {
  name: "Mobile Context (Narrow Container)",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "375px", border: "1px dashed #ccc" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    ariaLabel: "Mobile navigation",
    totalPages: 10,
    currentPage: 0,
  },
};
