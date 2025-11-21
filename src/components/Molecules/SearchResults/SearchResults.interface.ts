import type { SearchResultData } from "@src/types/Search.ts";

export interface SearchResultItemProps extends SearchResultData {
  isLast: boolean;
  isMobile: boolean;
}

export interface SearchResultsProps {
  searchResults: SearchResultData[];
  isMobile: boolean;
  limit?: number;
  totalResults?: number;
  startingItemIndex?: number;
  searchInput?: string;
}
