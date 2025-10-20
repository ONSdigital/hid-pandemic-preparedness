import type { Asset } from "@localTypes/Asset";
import type { LinkProps } from "@components/Molecules/Core/Link/Link.interface";
import type { TagData } from "@localTypes/TagData";

export interface CaseStudyCardProps {
  _uid: string;
  image: Asset;
  link: LinkProps;
  size: "large" | "small";
  subTitle: string;
  tag: TagData;
  title: string;
}
