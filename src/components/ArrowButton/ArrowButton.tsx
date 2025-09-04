import type { FC } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import clsx from "clsx";

import styles from "./ArrowButton.module.scss";
import type { ArrowButtonProps } from "./ArrowButton.interface";

export const ArrowButton: FC<ArrowButtonProps> = (props) => {
  // Combine base class and variant class
  const classes = clsx(
    styles["button"],
    styles[`arrow-button--${props.variant}`],
  );

  return (
    <button
      className={classes}
      aria-label={props.ariaLabel}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
    >
      <div className={styles["button__label"]}>
        {props.direction == "right" ? (
          <RiArrowRightSLine className={styles["button__label-icon"]} />
        ) : (
          <RiArrowLeftSLine className={styles["button__label-icon"]} />
        )}
      </div>
    </button>
  );
};
