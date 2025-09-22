import type { LinkData } from "@localTypes/LinkData";
import type { TagData } from "@localTypes/TagData";

export interface CardUnitProps {
  id: string;
  link: LinkData;
  subTitle: string;
  tags: TagData[];
  readingTime: string;
}
