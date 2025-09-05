import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";

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

// Component for brand svg using relative import so Storybook can pick up the asset
const BrandComponent: ReactNode = (
  <>
    <img
      src="./brand-inverse.svg"
      height="40px"
      alt="The Analysis for Action brand logo."
    />
  </>
);

const navbarData: NavbarProps = {
  brandComponent: BrandComponent,
  navItems: menuItems as NavItem[],
};
export const NavbarStory = {
  name: "Navbar",
  args: navbarData,
} satisfies Story;
