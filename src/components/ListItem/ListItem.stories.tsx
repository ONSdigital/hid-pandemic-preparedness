import type { Meta, StoryObj } from "@storybook/react";

import { MenuList } from "./ListItem";

const exampleMenuListData = [
  { href: "/page1", label: "Example menu list item 1" },
  { href: "/page2", label: "Example menu list item 1" },
  { href: "/page3", label: "Example menu list item 1" },
  { href: "/page4", label: "Example menu list item 1" },
  {
    href: "/page5",
    label: "Example menu list item — this one is extra long content",
  },
];

const meta = {
  argTypes: {
    items: {
      table: {
        disable: true,
      },
    },
  },
  component: MenuList,
  title: "Components/Menu-List",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MenuList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MenuListStory = {
  name: "Default Menu List",
  args: {
    items: exampleMenuListData,
    hasDivider: true,
  },
} satisfies Story;
