import { RiTimerLine } from "@remixicon/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";

import type { CardUnitProps } from "./CardUnit.interface";
import styles from "../CardUnit/CardUnit.module.scss";
import { Tag } from "../Tag/Tag";

// Set size of icon here using icon component props
const iconSize: string = "1.5rem";

export const CardUnit: FC<CardUnitProps> = (props) => {
  return (
    <div className={clsx("card", styles["card-unit"], "shadow", "p-2")}>
      <div className={clsx("card-body")}>
        <p className={clsx("card-title", "w-75")}>{props.link.label}</p>
        <p className={clsx("card-text", "w-75")}>{props.subTitle}</p>
      </div>
      <div
        className={clsx(
          "card-body",
          "border-top",
          "border-bottom",
          "d-inline-flex",
          "justify-content-start",
          "align-items-center",
          "py-3",
          "gap-2",
        )}
      >
        {props.tags.map((item) => (
          <Tag {...item} />
        ))}
      </div>
      <div
        className={clsx(
          "card-body",
          "d-inline-flex",
          "justify-content-start",
          "align-items-center",
          "py-3",
          "gap-2",
        )}
      >
        <div
          className={clsx(
            styles["time-box"],
            "rounded",
            "d-flex",
            "align-items-center",
            "justify-content-center",
          )}
        >
          <RiTimerLine size={iconSize} />
        </div>
        {props.readingTime}
      </div>
    </div>
  );
};
