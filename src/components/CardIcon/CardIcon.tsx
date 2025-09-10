import {
  RiDashboardLine,
  RiFocusLine,
  RiQuestionLine,
  RiRhythmFill,
} from "@remixicon/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";

import type { CardIconProps } from "./CardIcon.interface";
import styles from "../CardIcon/CardIcon.module.scss";
import { Link } from "../Link/Link";

const iconMap: Record<string, ReactNode> = {
  calculator: <RiRhythmFill size={"2.375rem"} />,
  dashboard: <RiDashboardLine size={"2.375rem"} />,
  questionbank: <RiQuestionLine size={"2.375rem"} />,
  report: <RiFocusLine size={"2.375rem"} />,
};

export const CardIcon: FC<CardIconProps> = (props) => {
  return (
    <div className={clsx("card", styles["card-icon"], "py-4")}>
      <div>
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
    </div>
  );
};
