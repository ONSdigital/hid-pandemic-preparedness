import type { LinkData } from "@localTypes/LinkData";
import type { Tag } from "@src/types/Tag";

export interface CardUnitProps {
  id: string;
  link: LinkData;
  subTitle: string;
  tags: Tag[];
  readingTime: string;
}
