import type { Meta, StoryObj } from "@storybook/react";

import { ListGroupChecks } from "./ListGroup";
import listGroupCheckData from "./listGroupCheckData.json";
const meta = {
  argTypes: {
    checkItems: {
      table: {
        disable: true,
      },
    },
    inverse: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    selectedIds: {
      table: {
        disable: true,
      },
    },
  },
  component: ListGroupChecks,
  title: "Components/List group",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ListGroupChecks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListGroupChecksStory = {
  name: "Checkboxes",
  args: listGroupCheckData,
} satisfies Story;
