import type { Meta, StoryObj } from "@storybook/react";

import menuItems from "../../content/menuItems.json";
import { ListGroupLinks } from "./ListGroup";
import type { ListGroupProps } from "./ListGroup.interface";

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
    inverse: {
      table: {
        disable: true,
      },
    },
  },
  component: ListGroupLinks,
  title: "Components/List group",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ListGroupLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

// Loads second element out of `menuItems.json` which contains valid nav menu data
const listGroupProps: ListGroupProps = {
  title: menuItems[1].label,
  children: menuItems[1].children,
};

export const ListGroupLinksStory = {
  name: "Links",
  args: listGroupProps,
} satisfies Story;

export const ListGroupLinksInverseStory = {
  name: "Links inverse",
  args: { ...listGroupProps, inverse: true },
  globals: {
    backgrounds: { value: "dark" },
  },
} satisfies Story;
