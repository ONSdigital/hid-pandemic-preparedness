import type { ImageData } from "@localTypes/ImageData";
import type { LinkData } from "@localTypes/LinkData";

export interface CardStatProps {
  id: string;
  title: string;
  subTitle: string;
  link: LinkData;
  image: ImageData;
}
