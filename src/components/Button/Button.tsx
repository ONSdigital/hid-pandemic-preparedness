import type { FC, MouseEventHandler } from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.interface";

export const Button: FC<ButtonProps> = (props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      aria-label={props.ariaLabel}
      className={clsx(
        "btn",
        `btn-${props.variant}`,
        props.className,
        styles[`btn-${props.variant}`],
      )}
      disabled={props.disabled}
      onClick={handleClick}
      type={props.type}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e as any);
        }
      }}
    >
      <div className={styles["btn-label"]}>{props.children}</div>
    </button>
  );
};
