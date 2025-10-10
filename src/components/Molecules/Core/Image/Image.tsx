import type { FC } from "react";

import type { ImageProps } from "./Image.interface";

export const Image: FC<ImageProps> = (props) => {
  // Make sure attributes are valid before setting them
  const alt: string = props.alt ? props.alt : "";
  const src: string = props.filename ? props.filename : "null";

  return <img role={"image"} src={src} alt={alt}></img>;
};
