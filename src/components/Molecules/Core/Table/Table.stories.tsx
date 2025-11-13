import type { Meta, StoryObj } from "@storybook/react";

import tableData from "./table.json?raw";
import { Table } from "./Table";
import type { TableProps } from "./Table.interface";

const meta = {
  component: Table,
  title: "Organisms/Core/Table",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableStory = {
  name: "Table",
  args: JSON.parse(tableData) as TableProps,
} satisfies Story;
