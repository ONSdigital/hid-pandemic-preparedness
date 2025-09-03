import type { FC } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

import styles from "./ArrowButton.module.scss";
import type { ArrowButtonProps } from "./ArrowButton.interface";

export const ArrowButton: FC<ArrowButtonProps> = (props) => {
  // Combine base class and variant class
  const buttonClass = styles["button"];
  const variantClass = styles[`arrow-button--${props.variant}`];
  const classes = [buttonClass, variantClass].filter(Boolean).join(" ");

  const onClick = () => {
    console.log("clicked!"); // eslint-disable-line no-undef
  };

  return (
    <button
      className={classes}
      aria-label={props.ariaLabel}
      disabled={props.disabled}
      onClick={onClick}
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
