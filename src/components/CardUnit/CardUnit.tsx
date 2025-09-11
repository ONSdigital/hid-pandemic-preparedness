import {
  RiDashboardLine,
  RiFocusLine,
  RiQuestionLine,
  RiRhythmFill,
} from "@remixicon/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";

import type { CardUnitProps } from "./CardUnit.interface";
import styles from "../CardTool/CardTool.module.scss";
import { Link } from "../Link/Link";

export const CardUnit: FC<CardUnitProps> = (props) => {
  return (
    <div className={clsx("card", styles["card-icon"], "shadow", "py-4")}>
      <div className={clsx("card-body", "text-center")}>
        <div
          className={clsx(
            styles["icon-box"],
            "rounded",
            "d-flex",
            "align-items-center",
            "justify-content-center",
            "mx-auto",
          )}
        >
          {iconMap[props.icon]}
        </div>
        <h4
          className={clsx("card-title", "py-3", "heading-s", "border-bottom")}
        >
          {props.title}
        </h4>
        <p className={clsx("card-text")}>{props.subTitle}</p>
        <Link href={props.link.href} label={props.link.label} />
      </div>
    </div>
  );
};
