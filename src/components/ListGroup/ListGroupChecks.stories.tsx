import type { Meta, StoryObj } from "@storybook/react";

import { ListGroupChecks } from "./ListGroup";
import listGroupCheckData from "@content/listGroupCheckData.json";
const meta = {
  argTypes: {
    listItems: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    inverse: {
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
