import type { Meta, StoryObj } from "@storybook/react";

import SearchResultsData from "@content/searchResults.json";
import { SearchResults } from "./SearchResults";
import type { SearchResultItemProps } from "./SearchResults.interface";

const meta = {
  component: SearchResults,
  title: "Molecules/SearchResults",
  parameters: {
    layout: "centered",
  },
  argTypes: { searchResults: { table: { disable: true } } },
} satisfies Meta<typeof SearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchResultsStory = {
  name: "SearchResults",
  args: { searchResults: SearchResultsData as SearchResultItemProps[] },
} satisfies Story;
