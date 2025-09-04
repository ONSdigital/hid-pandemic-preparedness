import type { Meta, StoryObj } from "@storybook/react";

import { Navbar } from "./Navbar";
import type { NavbarProps } from "./Navbar.interface";

const meta = {
  component: Navbar,
  title: "Components/Navbar",
  argTypes: {
    menuItems: {
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
  menuItems: [
    { title: "About" },
    { title: "Learning resources" },
    { title: "Case studies" },
    { title: "Tools" },
    { title: "Contact" },
  ],
};
export const NavbarStory = {
  name: "Navbar",
  args: navbarData,
} satisfies Story;
