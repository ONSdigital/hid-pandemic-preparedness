import type { FC } from "react";

import "./Button.scss";
import type { ButtonProps } from "./Button.interface";

export const Button: FC<ButtonProps> = (props) => {
  // Combine base class and variant class
  const classes = `button button--${props.variant}`.trim();

  return (
    <button
      aria-label={props.ariaLabel}
      className={classes}
      disabled={props.disabled}
    >
      <div className="button__label">
        <props.children />
      </div>
    </button>
  );
};
