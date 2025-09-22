import type { Meta, StoryObj } from "@storybook/react";

import { SearchBar } from "./SearchBar";
import type { SearchBarProps } from "./SearchBar.interface";

const meta = {
  component: SearchBar,
  title: "Molecules/SearchBar",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const searchBarProps: SearchBarProps = {
  placeholder: "Search all resources",
};

export const SearchBarStory = {
  name: "SearchBar",
  args: searchBarProps,
} satisfies Story;
