import clsx from "clsx";
import type { FC } from "react";

import type { ReferenceProps } from "./Reference.interface";

export const Reference: FC<ReferenceProps> = (props) => {
  // Set label to a placeholder if its not provided
  const label: string = props.label ? props.label : "REF!";
  // Make the link href to be the uid of the reference so we can use this to jump to the references
  // section at the foot of the page
  const url: string = `#${props._uid}`;

  return (
    <a
      role="reference-link"
      className={clsx("link-underline", "link-underline-opacity-0")}
      href={url}
    >
      ({label})
    </a>
  );
};
