import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";
import type { HeaderProps } from "./Header.interface";

const meta = {
  component: Header,
  title: "Organisms/Core/Header",
  argTypes: {
    breadcrumbs: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const headerProps: HeaderProps = {
  title: "Basic Data Visualisation",
  breadcrumbs: {
    items: [
      {
        href: "/",
        label: "Home",
        id: "0c6dd168-38da-4a09-b62c-971490cb80b4",
      },
      {
        href: "/",
        label: "Outputs and Reporting",
        id: "ff2c92ba-35db-4c63-91fb-1c7f5075c15b",
      },
      {
        href: "/",
        label: "Basic Data Visualisation",
        id: "a8aead7c-4748-4c37-961d-caa64ff6558b",
      },
    ],
  },
};

export const HeaderStory = {
  name: "Header",
  args: headerProps,
} satisfies Story;
