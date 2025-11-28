import type { Meta, StoryObj } from "@storybook/react";
import { SearchResults } from "./SearchResults";
import type {
  PagefindResultsData,
  PagefindSubResult,
} from "../SearchBar/SearchBar.interface";
import type { SearchResultData } from "@src/types/Search.ts";

const processPagefindResults = async (
  search: any,
): Promise<SearchResultData[]> => {
  if (!search) return [];

  const loadedResults: PagefindResultsData[] = await Promise.all(
    search.results.map((r: any) => r.data()),
  );

  return loadedResults.flatMap((pagefindResults: PagefindResultsData) => {
    const tagObject = pagefindResults.meta?.tag
      ? { ...pagefindResults.meta.tag }
      : undefined;

    return pagefindResults.sub_results.map((subResult: PagefindSubResult) => {
      const resultItem: SearchResultData = {
        link: {
          href: subResult.url,
          label: subResult.title,
        },
        excerpt: subResult.excerpt,
      };

      if (tagObject) {
        resultItem.tag = tagObject;
      }

      return resultItem;
    });
  });
};

const meta = {
  component: SearchResults,
  title: "Molecules/SearchResults",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    searchResults: { table: { disable: true } },
  },
} satisfies Meta<typeof SearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DynamicResults: Story = {
  name: "Dynamic Results (from Pagefind)",
  loaders: [
    async () => {
      try {
        const pagefindPath = "/pagefind/pagefind.js";
        // @ts-ignore
        const pf = await import(/* @vite-ignore */ pagefindPath);
        await pf.init();

        // Run a search for a sample term.
        const search = await pf.debouncedSearch("page");
        const results = await processPagefindResults(search);

        return {
          searchResults: results,
        };
      } catch (e) {
        console.error("Storybook Pagefind loader failed:", e);
        return { searchResults: [] };
      }
    },
  ],
  args: {
    searchResults: [],
    isMobile: false,
    searchInput: "page",
  },
};

export const DynamicWithLimit: Story = {
  ...DynamicResults,
  name: "Dynamic Results (With Limit)",
  args: {
    ...DynamicResults.args,
    limit: 3,
  },
};

export const EmptyState: Story = {
  name: "Empty State",
  args: {
    searchResults: [], // Empty array triggers "No results"
    isMobile: false,
    searchInput: "missing term",
  },
};

export const LoadingState: Story = {
  name: "Loading State",
  args: {
    searchResults: null, // Null triggers "Searching..."
    isMobile: false,
    searchInput: "loading...",
  },
};
