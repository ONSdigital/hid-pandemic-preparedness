import type { FC } from "react";
import { RiArrowRightLine, RiShareBoxFill } from "@remixicon/react";

import "../Button/Button.scss";
import "./Link.scss";
import type { LinkProps } from "./Link.interface";

export const Link: FC<LinkProps> = (props) => {
  // Set css class based on whether we are rendering as a button or not
  let classes = "";

  if (props.asButton) {
    classes = `button button--${props.buttonVariant}`.trim();
  } else {
    classes = "link";
  }

  // Just render the label text by default
  let Label: FC = () => <>{props.label}</>;

  if (props.href.startsWith("http")) {
    // If href starts with http, render as an external link to include icon
    Label = () => (
      <>
        {props.label} <RiShareBoxFill className="link__icon" />
      </>
    );
  } else if (props.href.startsWith("/")) {
    // If href starts with /, this is an internal navigation link so render with right arrow icon
    Label = () => (
      <>
        {props.label} <RiArrowRightLine className="link__icon" />
      </>
    );
  }

  return (
    <a className={classes} href={props.href} target={props.target}>
      <Label />
    </a>
  );
};
