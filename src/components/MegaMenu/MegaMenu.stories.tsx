import type { Meta, StoryObj } from "@storybook/react";

import menuItems from "../../content/menuItems.json";
import type { NavItem } from "../../types/NavItem";
import { MegaMenu } from "./MegaMenu";
import type { MegaMenuProps } from "./MegaMenu.interface";

const meta = {
  component: MegaMenu,
  title: "Components/MegaMenu",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MegaMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const megaMenuProps: MegaMenuProps = {
  // This loads the "learning resources part of the menu items"
  navItems: menuItems[1].children as NavItem[],
};

export const MegaMenuStory = {
  name: "MegaMenu",
  args: megaMenuProps,
} satisfies Story;
