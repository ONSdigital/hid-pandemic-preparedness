import type { LinkData } from "@localTypes/LinkData";
import type { Tag } from "@src/types/Tag";

export interface SearchResultItemProps {
  link: LinkData;
  excerpt: string;
  tag?: Tag;
  isLast: boolean;
}

export interface SearchResultsProps {
  searchResults: SearchResultItemProps[];
  isMobile: boolean;
}
