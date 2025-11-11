import type { Meta, StoryObj } from "@storybook/react";

import { Paginator } from "./Paginator";
import type { PaginatorProps } from "./Paginator.interface";

const meta = {
  component: Paginator,
  title: "Molecules/Core/Paginator",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Paginator>;

export default meta;
type Story = StoryObj<typeof meta>;

const paginatorProps: PaginatorProps = {
  perPage: 10,
  total: 100,
};

export const PaginatorStory = {
  name: "Paginator",
  args: paginatorProps,
} satisfies Story;
