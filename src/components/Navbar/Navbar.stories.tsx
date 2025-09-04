import type { Meta, StoryObj } from "@storybook/react";

import menuItems from "../../content/menuItems.json";
import { Navbar } from "./Navbar";
import type { NavbarProps } from "./Navbar.interface";
import type { NavItem } from "../../types/NavItem";

const meta = {
  component: Navbar,
  title: "Components/Navbar",
  argTypes: {
    navItems: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const navbarData: NavbarProps = {
  navItems: menuItems as NavItem[],
};
export const NavbarStory = {
  name: "Navbar",
  args: navbarData,
} satisfies Story;
