import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";
import type { HeaderProps } from "./Header.interface";
import SearchBar from "../SearchBar/SearchBar";

const meta = {
  component: Header,
  title: "Components/Header",
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const HeaderSearchBarComponent = (
  <SearchBar ariaLabel="Search" placeholder="Search learning resources" />
);

const headerData: HeaderProps = {
  children: HeaderSearchBarComponent,
  description:
    "Empowering National Statistical Offices with the skills and tools to support evidence based response to infectious disease outbreaks.",
  heading: "Resilience Through Data",
  subheading: "Home",
};

export const HeaderStory = {
  args: headerData,
  name: "Header",
} satisfies Story;
