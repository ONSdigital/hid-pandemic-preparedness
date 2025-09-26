import type { TagData } from "@localTypes//TagData";
import type { LinkData } from "@localTypes/LinkData";

export interface SearchResultItemProps {
  link: LinkData;
  contextLabel: string;
  tag: TagData;
}
export interface SearchResultsProps {
  searchResults: SearchResultItemProps[];
}
