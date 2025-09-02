import type { FC } from "react";
import { RiArrowRightSLine } from "@remixicon/react";

import styles from "./ArrowButton.module.scss";
import type { ArrowButtonProps } from "./ArrowButton.interface";

const { button, button__label, "button__label-icon": buttonLabel } = styles;

export const ArrowButton: FC<ArrowButtonProps> = (props) => {
  // Combine base class and variant class
  const variantClass = styles[`arrow-button--${props.variant}`];
  const classes = [button, variantClass].filter(Boolean).join(" ");

  return (
    <button
      className={classes}
      aria-label={props.ariaLabel}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
    >
      <div className={button__label}>
        <RiArrowRightSLine className={buttonLabel} />
      </div>
    </button>
  );
};
