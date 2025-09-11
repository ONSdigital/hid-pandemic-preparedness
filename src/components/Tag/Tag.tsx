import type { FC } from "react";
import clsx from "clsx";

import type { TagProps } from "./Tag.interface";
import styles from "./Tag.module.scss";

export const Tag: FC<TagProps> = (props) => {
  return (
    <span
      className={clsx(
        "badge",
        "rounded-pill",
        styles[`tag-${props.type}`],
        "fs-6",
        "px-2",
        "py-1",
      )}
    >
      {props.title}
    </span>
  );
};
