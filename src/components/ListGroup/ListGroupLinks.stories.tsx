import type { Meta, StoryObj } from "@storybook/react";

import type { NavItem } from "../../types/NavItem";
import menuItems from "../../content/menuItems.json";
import { ListGroupLinks } from "./MenuList";
import type { ListGroupProps } from "./MenuList.interface";

const meta = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    href: {
      table: {
        disable: true,
      },
    },
    title: {
      table: {
        disable: true,
      },
    },
  },
  component: ListGroupLinks,
  title: "Components/List group",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ListGroupLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

// Loads second element out of `menuItems.json` which contains valid nav menu data
const listGroupProps: ListGroupProps = {
  // title: menuItems[1].label,
  title: "fuck off",
  children: menuItems[1].children,
};

export const ListGroupLinksStory = {
  name: "Links",
  args: listGroupProps,
} satisfies Story;
