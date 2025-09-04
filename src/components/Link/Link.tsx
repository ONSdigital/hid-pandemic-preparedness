import type { FC } from "react";
import { RiArrowRightLine, RiShareBoxFill } from "@remixicon/react";
import clsx from "clsx";

import buttonStyles from "../Button/Button.module.scss";
import linkStyles from "./Link.module.scss";
import type { LinkProps } from "./Link.interface";

export const Link: FC<LinkProps> = (props) => {
  let classes = "";
  let Icon = null;

  // Set css class based on whether we are rendering as a button or inverse
  if (props.asButton) {
    // Combine base class and variant class
    classes = clsx(
      buttonStyles["button"],
      buttonStyles[`button--${props.buttonVariant}`],
    );
  } else if (props.textInverse) {
    classes = clsx(linkStyles["link"], linkStyles["link--inverse"]);
  } else {
    classes = linkStyles["link"];
  }

  if (props.href.startsWith("http")) {
    // If href starts with http, render as an external link to include icon
    Icon = <RiShareBoxFill className="link__icon" />;
  } else if (props.href.startsWith("/")) {
    // If href starts with /, this is an internal navigation link so render with right arrow icon
    Icon = <RiArrowRightLine className="link__icon" />;
  }

  return (
    <a className={classes} href={props.href} target={props.target}>
      {/* Renders the label and an icon if not null */}
      {props.label} {Icon && Icon}
    </a>
  );
};
