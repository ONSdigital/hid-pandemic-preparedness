import type { FC } from "react";
import clsx from "clsx";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

import styles from "./Button.module.scss";
import type { ButtonProps, ButtonArrowProps } from "./Button.interface";

export const Button: FC<ButtonProps> = (props) => {
  const onClick = () => {
    console.log("clicked!");
  };

  return (
    <button
      aria-label={props.ariaLabel}
      className={clsx("btn", `btn-${props.variant}`)}
      disabled={props.disabled}
      onClick={onClick}
      type={props.type}
    >
      <div className={styles["btn-label"]}>{props.children}</div>
    </button>
  );
};

export const ButtonArrow: FC<ButtonArrowProps> = (props) => {
  // Combine base class and variant class
  const classes = clsx(
    styles["button"],
    styles[`arrow-button--${props.variant}`],
  );

  const onClick = () => {
    console.log("clicked!"); // eslint-disable-line no-undef
  };

  return (
    <button
      className={clsx("btn", styles["btn-arrow"], `btn-${props.variant}`)}
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
