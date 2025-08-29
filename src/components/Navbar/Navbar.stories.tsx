import type { Meta, StoryObj } from "@storybook/react";

import { Navbar } from "./Navbar";
// import type { NavbarProps } from "./Navbar.interface";

const meta = {
  component: Navbar,
  title: "Components/Navbar",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavbarStory = {
  name: "Navbar",
} satisfies Story;
