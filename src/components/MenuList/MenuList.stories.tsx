import type { Meta, StoryObj } from "@storybook/react";

import type { NavItem } from "../../types/NavItem";
import menuItems from "../../content/menuItems.json";
import { MenuList } from "./MenuList";

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
    label: {
      table: {
        disable: true,
      },
    },
  },
  component: MenuList,
  title: "Components/Menu list",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MenuList>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const MenuListStory = {
//   // Loads second element out of `menuItems.json` which contains valid nav menu data
//   name: "Menu list",
//   args: menuItems[1] as NavItem,
// } satisfies Story;
