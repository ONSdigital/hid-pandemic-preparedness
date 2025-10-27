import type { Asset } from "@localTypes/Asset";
import type { LinkProps } from "@components/Molecules/Core/Link/Link.interface";
import type { Tag } from "@src/types/Tag";

export interface CaseStudyCardProps {
  _uid: string;
  link: LinkProps;
  image: Asset;
  size: "large" | "small";
  subTitle: string;
  tag: Tag;
  title: string;
}
