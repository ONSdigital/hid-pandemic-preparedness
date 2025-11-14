import type { LinkData } from "@localTypes/LinkData";
import type { Tag } from "@src/types/Tag";

export interface SearchResultData {
  link: LinkData;
  excerpt: string;
  tag?: Tag[];
}