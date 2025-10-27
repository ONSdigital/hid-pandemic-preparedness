import type { LinkData } from "@localTypes/LinkData";
import type { Tag } from "@src/types/Tag";

export interface SearchResultItemProps {
  link: LinkData;
  contextLabel: string;
  tag: Tag;
}
export interface SearchResultsProps {
  searchResults: SearchResultItemProps[];
}
