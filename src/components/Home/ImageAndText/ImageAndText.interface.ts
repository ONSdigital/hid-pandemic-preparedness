import type { ImageData } from "../../../types/ImageData";
import type { LinkData } from "../../../types/LinkData";

export interface ImageAndTextProps {
  title: string;
  subTitle: string;
  image: ImageData;
  link: LinkData;
}
