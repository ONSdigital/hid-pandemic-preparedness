import type { ImageProps } from "@components/Molecules/Core/Image/Image.interface";
import type { Link } from "@localTypes/Link";

export interface ImageAndTextProps {
  _uid: string;
  title: string;
  subTitle: string;
  link: Link;
  image: ImageProps;
}
