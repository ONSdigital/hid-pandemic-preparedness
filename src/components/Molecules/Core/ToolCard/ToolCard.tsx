import {
  RiDashboardLine,
  RiFocusLine,
  RiQuestionLine,
  RiRhythmFill,
} from "@remixicon/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";

import { Link } from "@components/Molecules/Core/Link/Link";
import type { ToolCardProps } from "./ToolCard.interface";
import styles from "./ToolCard.module.scss";

// Set size of icon here using icon component props
const iconSize: string = "2.375rem";

const iconMap: Record<string, ReactNode> = {
  calculator: <RiRhythmFill size={iconSize} />,
  dashboard: <RiDashboardLine size={iconSize} />,
  questionbank: <RiQuestionLine size={iconSize} />,
  report: <RiFocusLine size={iconSize} />,
};

export const ToolCard: FC<ToolCardProps> = (props) => {
  return (
    <div className={clsx("card", styles["card-tool"], "shadow", "py-4")}>
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
        <Link
          {...props.link}
          className={clsx("fw-semibold", styles["link-color"])}
        />
      </div>
    </div>
  );
};
