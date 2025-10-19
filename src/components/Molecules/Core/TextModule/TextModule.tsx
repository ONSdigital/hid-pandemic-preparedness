import clsx from "clsx";
import type { FC } from "react";

import type { TextModuleProps } from "./TextModule.interface";

// Renders input `htmlContent` within outer div
export const TextModule: FC<TextModuleProps> = (props) => {
  return (
    <div
      className={clsx(props.className && props.className)}
      dangerouslySetInnerHTML={{ __html: props.htmlContent }}
    />
  );
};
