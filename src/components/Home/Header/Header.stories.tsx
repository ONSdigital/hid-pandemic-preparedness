import type { Meta, StoryObj } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { Header } from "./Header";
import type { HeaderProps } from "./Header.interface";

const meta = {
  component: Header,
  title: "Organisms/Home/Header",
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const headerProps: HeaderProps = {
  breadcrumbs: {
    items: [
      {
        href: "/",
        label: "Home",
        id: uuidv4(),
      },
    ],
  },
  title: "Resilience Through Data",
  subTitle:
    "Empowering National Statistical Offices with the skills and tools to support evidence based response to infectious disease outbreaks.",
};

export const HeaderStory = {
  name: "Header",
  args: headerProps,
} satisfies Story;
