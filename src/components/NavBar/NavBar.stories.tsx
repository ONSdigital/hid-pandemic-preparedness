import type { Meta, StoryObj } from "@storybook/react";

import navBarData from "../../content/base/navBarData.json";
import { NavBar } from "./NavBar";
import type { NavBarProps } from "./NavBar.interface";

const meta = {
  component: NavBar,
  title: "Components/NavBar",
  argTypes: {
    items: {
      table: {
        disable: true,
      },
    },
    languages: {
      table: {
        disable: true,
      },
    },
    selectedLanguage: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavBarStory = {
  name: "NavBar",
  args: navBarData as NavBarProps,
} satisfies Story;
