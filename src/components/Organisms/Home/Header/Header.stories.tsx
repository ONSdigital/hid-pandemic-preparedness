import type { Meta, StoryObj } from "@storybook/react";

import headerProps from "./header.json";
import { Header } from "./Header";
import type { HeaderProps } from "./Header.interface";

const meta = {
  component: Header,
  title: "Organisms/Home/Header",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    _uid: {
      table: {
        disable: true,
      },
    },
    breadcrumbs: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const headerData: HeaderProps = {
  ...headerProps,
  breadcrumbs: {
    items: [
      {
        href: "/",
        label: "Home",
        id: "0c6dd168-38da-4a09-b62c-971490cb80b4",
      },
    ],
  },
};

export const HeaderStory = {
  name: "Header",
  args: { ...headerData },
} satisfies Story;
