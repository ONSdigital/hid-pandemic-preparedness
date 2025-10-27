import type { FC } from "react";
import clsx from "clsx";

import strings from "@src/content/strings.json";

import type { TagProps } from "./Tag.interface";
import styles from "./Tag.module.scss";

export const Tag: FC<TagProps> = (props) => {
  const title: string = props.title;
  // Set type to be level by default
  let type: string = "level";

  // Set tag styling based on input title
  if (Object.values(strings.locations).includes(title)) {
    type = "location";
  } else if (Object.values(strings.themes).includes(title)) {
    type = "theme";
  }

  return (
    <span
      className={clsx(
        "badge",
        "rounded-pill",
        styles[`tag-${type}`],
        "px-3",
        "py-2",
        "text-center",
        "text-truncate",
      )}
      role={`tag-${type}`}
    >
      {props.title}
    </span>
  );
};
