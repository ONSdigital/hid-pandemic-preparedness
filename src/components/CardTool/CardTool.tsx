import {
  RiDashboardLine,
  RiFocusLine,
  RiQuestionLine,
  RiRhythmFill,
} from "@remixicon/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";

import type { CardToolProps } from "./CardTool.interface";
import styles from "../CardTool/CardTool.module.scss";
import { Link } from "../Link/Link";

// Set size of icon here using icon component props
const iconSize: string = "2.375rem";

const iconMap: Record<string, ReactNode> = {
  calculator: <RiRhythmFill size={iconSize} />,
  dashboard: <RiDashboardLine size={iconSize} />,
  questionbank: <RiQuestionLine size={iconSize} />,
  report: <RiFocusLine size={iconSize} />,
};

export const CardTool: FC<CardToolProps> = (props) => {
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
