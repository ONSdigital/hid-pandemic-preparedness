import type { FC } from "react";

import type { ImageProps } from "./Image.interface";

// Render image as a component to load different src paths depending on whether we are rendering
// on Storybook or Astro page. This will probably be updated once we figure out how to properly
// get Storybook to load svgs as components automatically
export const Brand: FC<ImageProps> = (props) => {
  return (
    <img
      src={props.srcPath}
      alt={props.altText}
      height={props.height && props.height}
    />
  );
};
