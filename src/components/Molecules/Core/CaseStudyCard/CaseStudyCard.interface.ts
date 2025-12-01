import type { Asset } from "@src/types/Asset";
import type { LinkProps } from "@src/components/Molecules/Core/Link/Link.interface";
import type { Tag } from "@src/types/Tag";

export interface CaseStudyCardProps {
  _uid: string;
  link: LinkProps;
  image: Asset;
  size: "large" | "small";
  subTitle: string;
  title: string;
  tag?: Tag;
}
