import clsx from "clsx";
import type { FC } from "react";
import slugify from "slugify";

import type { ReferenceProps } from "./Reference.interface";

import styles from "./Reference.module.scss";

export const Reference: FC<ReferenceProps> = (props) => {
  // Set label to a placeholder if its not provided
  const label: string = props.label ? props.label : "REF!";
  // Make the link href to include the label if it exists so we can use this to jump to the references
  // section at the foot of the page
  const url: string = props.label
    ? `#ref-${slugify(props.label, { lower: true })}`
    : "#";

  return (
    <a
      role="reference-link"
      className={clsx(
        styles["ref-link"],
        "link-underline",
        "link-underline-opacity-0",
      )}
      href={url}
    >
      ({label})
    </a>
  );
};
