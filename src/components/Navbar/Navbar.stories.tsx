import type { Meta, StoryObj } from "@storybook/react";

import menuItems from "../../content/menuItems.json";
import { Brand, Navbar } from "./Navbar";
import type { NavbarProps } from "./Navbar.interface";
import type { NavItem } from "../../types/NavItem";

const meta = {
  component: Navbar,
  title: "Components/Navbar",
  argTypes: {
    brandComponent: {
      table: {
        disable: true,
      },
    },
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
  // Component for brand svg using relative import so Storybook can pick up the asset
  brandComponent: <Brand src="./brand-inverse.svg" />,
  navItems: menuItems as NavItem[],
};
export const NavbarStory = {
  name: "Navbar",
  args: navbarData,
} satisfies Story;
