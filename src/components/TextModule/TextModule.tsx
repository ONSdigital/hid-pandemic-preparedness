import clsx from "clsx";
import type { FC } from "react";

import type { TextModuleProps } from "./TextModule.interface";

export const TextModule: FC<TextModuleProps> = (props) => {
  return (
    <div
      className={clsx("row", props.className && props.className)}
      dangerouslySetInnerHTML={{ __html: props.htmlContent }}
    />
  );
};
