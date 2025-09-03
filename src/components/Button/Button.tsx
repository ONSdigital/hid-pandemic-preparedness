import type { FC } from "react";

import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.interface";

export const Button: FC<ButtonProps> = (props) => {
  // Combine base class and variant class
  const buttonClass = styles["button"];
  const variantClass = styles[`button--${props.variant}`];
  const classes = [buttonClass, variantClass].filter(Boolean).join(" ");

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
      <div className={styles["button__label"]}>{props.children}</div>
    </button>
  );
};
