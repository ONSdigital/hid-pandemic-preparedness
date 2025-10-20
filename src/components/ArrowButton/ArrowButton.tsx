import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import clsx from "clsx";
import type { FC } from "react";

import type { ArrowButtonProps } from "./ArrowButton.interface";
import styles from "./ArrowButton.module.scss";

export const ArrowButton: FC<ArrowButtonProps> = (props) => {
  return (
    <button
      className={clsx("btn", styles["btn-arrow"], `btn-${props.variant}`)}
      aria-label={props.ariaLabel}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
    >
      {props.direction == "left" ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
    </button>
  );
};
