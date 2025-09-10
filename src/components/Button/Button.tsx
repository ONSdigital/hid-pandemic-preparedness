import type { FC } from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.interface";

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
