import type { Asset } from "@localTypes/Asset";
import type { LinkProps } from "@components/Molecules/Core/Link/Link.interface";
import type { TagData } from "@localTypes/TagData";

export interface CaseStudyCardProps {
  _uid: string;
  size: "large" | "small";
  title: string;
  subTitle: string;
  link: LinkProps;
  image: Asset;
  tag: TagData;
}
