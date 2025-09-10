import type { ImageData } from "../../types/ImageData";
import type { LinkData } from "../../types/LinkData";

export interface CardCaseStudyProps {
  id: string;
  title: string;
  subTitle: string;
  link: LinkData;
  image: ImageData;
}
