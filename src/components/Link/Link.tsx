import type { FC } from "react";
import {
  RiArrowGoBackLine,
  RiArrowRightLine,
  RiShareBoxFill,
} from "@remixicon/react";
import clsx from "clsx";

import type { LinkProps } from "./Link.interface";

export const Link: FC<LinkProps> = (props) => {
  let classes: string[] = [];
  let Icon = null;

  // Set css class based on whether we are rendering as a button or inverse
  if (props.asButton) {
    // Combine base class and variant class
    classes = ["btn", `btn-${props.buttonVariant}`, "fw-medium"];
  } else if (props.textInverse) {
    classes = [
      "link-light",
      "link-underline",
      "link-underline-opacity-0",
      "fw-bold",
    ];
  } else {
    classes = [
      "link-dark",
      "link-underline",
      "link-underline-opacity-0",
      "fw-bold",
    ];
  }

  if (props.disabled) {
    classes.push("disabled");
  }

  if (props.href.startsWith("http")) {
    // If href starts with http, render as an external link to include icon
    Icon = <RiShareBoxFill />;
  } else if (props.href.startsWith("/")) {
    // If href starts with /, this is an internal navigation link
    if (props.goBack) {
      // If goBack, render a back icon
      Icon = <RiArrowGoBackLine />;
    } else {
      // Render with right arrow icon
      Icon = <RiArrowRightLine />;
    }
  }

  // Add any additional classes passed via props.className
  if (props.className) {
    classes.push(props.className);
  }

  // Add handling of disabled prop
  // https://getbootstrap.com/docs/5.3/components/buttons/#link-functionality-caveat

  return (
    <a
      className={clsx(classes)}
      href={props.href}
      target={props.target}
      aria-disabled={props.disabled}
    >
      {/* Renders the label and an icon if not null */}
      {props.label} {Icon && Icon}
    </a>
  );
};
