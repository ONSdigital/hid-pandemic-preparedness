import type { Meta, StoryObj } from "@storybook/react";

import menuItems from "../../../content/menuItems.json";
import type { NavItem } from "../../../types/NavItem";
import { QuickLinks } from "./QuickLinks";
import type { QuickLinksProps } from "./QuickLinks.interface";

const meta = {
  component: QuickLinks,
  title: "Organisms/Home/QuickLinks",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    navItems: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof QuickLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

const quickLinksProps: QuickLinksProps = {
  title: "Learning resources",
  // This loads the "learning resources part of the menu items"
  navItems: menuItems[1].children as NavItem[],
};

export const QuickLinksStory = {
  name: "QuickLinks",
  args: quickLinksProps,
} satisfies Story;
