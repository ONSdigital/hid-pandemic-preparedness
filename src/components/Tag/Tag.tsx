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
        "text-nowrap",
        "text-truncate",
        styles[`tag-${props.type}`],
        "px-3",
        "py-2",
      )}
    >
      {props.title}
    </span>
  );
};
