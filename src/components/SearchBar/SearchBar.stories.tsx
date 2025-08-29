import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "./SearchBar";
import type { SearchBarProps } from "./SearchBar.interface";

const meta = {
  component: SearchBar,
  title: "Components/SearchBar",
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const searchBarData: SearchBarProps = {
  placeholder: "Search all resources",
  ariaLabel: "search",
};

export const HeaderStory = {
  name: "Search Bar",
  args: searchBarData,
} satisfies Story;
