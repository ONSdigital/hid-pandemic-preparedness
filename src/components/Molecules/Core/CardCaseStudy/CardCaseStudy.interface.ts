import type { Asset } from "@src/types/Asset";
import type { LinkProps } from "@src/components/Molecules/Core/Link/Link.interface";

export interface CardCaseStudyProps {
  _uid: string;
  title: string;
  subTitle: string;
  link: LinkProps;
  image: Asset;
}
