import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";
import type { HeaderProps } from "./Header.interface";

const meta = {
  component: Header,
  title: "Components/Header",
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const headerData: HeaderProps = {
  subheading: "Home",
  heading: "Resilience Through Data",
  description:
    "Empowering National Statistical Offices with the skills and tools to support evidence based response to infectious disease outbreaks.",
};

export const HeaderStory = {
  name: "Header",
  args: headerData,
} satisfies Story;
