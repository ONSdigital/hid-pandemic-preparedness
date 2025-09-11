import type { LinkData } from "../../types/LinkData";
import type { TagData } from "../../types/TagData";

export interface CardUnitProps {
  id: string;
  link: LinkData;
  subTitle: string;
  tags: TagData[];
  readingTime: string;
}
