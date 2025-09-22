import { RiTimerLine } from "@remixicon/react";
import clsx from "clsx";
import type { FC } from "react";

import type { CardUnitProps } from "./CardUnit.interface";
import styles from "../CardUnit/CardUnit.module.scss";
import { Tag } from "@components/Tag/Tag";

// Set size of icon here using icon component props
const iconSize: string = "1.5rem";

export const CardUnit: FC<CardUnitProps> = (props) => {
  return (
    <div className={clsx("card", styles["card-width"], "shadow", "p-2")}>
      <div className={clsx("card-body", "w-75")}>
        <div className={clsx("card-title", styles["title-height"])}>
          <a className={clsx("fw-bold")} href={props.link.href}>
            {props.link.label}
          </a>
        </div>
        <p className={clsx("card-text")}>{props.subTitle}</p>
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
          <Tag {...item} key={item.id} />
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
