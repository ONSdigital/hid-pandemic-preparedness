import type { Meta, StoryObj } from "@storybook/react";

import navBarData from "./navBar.json?raw";

import { NavBar } from "./NavBar";

const meta = {
  component: NavBar,
  title: "Organisms/Core/NavBar",
  parameters: {
    controls: {
      disable: true,
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavBarStory = {
  name: "NavBar",
  args: JSON.parse(navBarData),
} satisfies Story;
