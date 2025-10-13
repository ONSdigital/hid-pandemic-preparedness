import type { ImageProps } from "@src/components/Molecules/Core/Image/Image.interface";
import type { Link } from "@src/types/Link";

export interface ImageAndTextProps {
  _uid: string;
  title: string;
  subTitle: string;
  link: Link;
  image: ImageProps;
}
