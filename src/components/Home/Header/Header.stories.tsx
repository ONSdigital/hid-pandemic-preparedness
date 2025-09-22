import type { Meta, StoryObj } from "@storybook/react";

import headerData from "../../../content/Home/header.json";
import { Header } from "./Header";
import type { HeaderProps } from "./Header.interface";

const meta = {
  component: Header,
  title: "Organisms/Home/Header",
  parameters: {
    layout: "fullscreen",
  },
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

export const HeaderStory = {
  name: "Header",
  args: { ...headerData } as HeaderProps,
} satisfies Story;
