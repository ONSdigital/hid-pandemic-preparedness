import type { Meta, StoryObj } from "@storybook/react";

import ListItem from "./ListItem";
import type { ReactNode } from "react";

const meta = {
  component: ListItem,
  title: "Components/List-Item",
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },

  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const listItemSingularTextComponent: ReactNode = (
  <p className="body">This is a list item</p>
);

const listItemDoubleTextComponent: ReactNode = (
  <>
    <p className="body">This is a list item</p>
    <p className="body">This is another list item</p>
  </>
);

export const singularListContentStory = {
  name: "List item",
  args: {
    children: listItemSingularTextComponent,
    hasLine: true,
  },
} satisfies Story;

export const multipleListContentStory = {
  name: "List item - double text",
  args: {
    children: listItemDoubleTextComponent,
    hasLine: true,
  },
} satisfies Story;
