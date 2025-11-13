import type { FC } from "react";
import {
  RiArrowGoBackLine,
  RiArrowRightLine,
  RiShareBoxFill,
} from "@remixicon/react";
import clsx from "clsx";

import { sanitizeUrl } from "@src/helpers/sanitizeUrl";

import type { LinkProps } from "./Link.interface";

export const Link: FC<LinkProps> = (props) => {
  console.log("props", props);
  let classes: string[] = [];
  let Icon = null;
  const url = props.linktype === "story" ? props.cached_url : props.url;

  // Sanitize the url first just to make sure its in the correct format
  const sanitizedUrl = sanitizeUrl(url);

  // Set css class based on whether we are rendering as a button or inverse
  if (props.asButton) {
    // Combine base class and variant class
    classes = ["btn", `btn-${props.buttonVariant}`, "fw-medium"];
  } else if (props.textInverse) {
    classes = ["link-light", "link-underline", "link-underline-opacity-0"];
  } else {
    classes = ["link-underline", "link-underline-opacity-0"];
  }

  if (props.disabled) {
    classes.push("disabled");
  }

  if (sanitizedUrl.startsWith("http")) {
    // If href starts with http, render as an external link to include icon
    Icon = <RiShareBoxFill />;
  } else if (sanitizedUrl.startsWith("/")) {
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
      href={sanitizedUrl}
      target={props.target}
      aria-disabled={props.disabled}
    >
      {/* Renders the label and an icon if not null */}
      {props.label ?? props.title} {!props.hideIcon && Icon && Icon}
    </a>
  );
};
