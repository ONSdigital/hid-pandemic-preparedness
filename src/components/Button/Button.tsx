import type { FC } from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.interface";

export const Button: FC<ButtonProps> = (props) => {
  // Combine base class and variant class
  const classes = clsx(styles["btn"], styles[`btn-${props.variant}`]);

  const onClick = () => {
    console.log("clicked!");
  };

  return (
    <button
      aria-label={props.ariaLabel}
      className={classes}
      disabled={props.disabled}
      onClick={onClick}
      type={props.type}
    >
      <div className={styles["btn-label"]}>{props.children}</div>
    </button>
  );
};
