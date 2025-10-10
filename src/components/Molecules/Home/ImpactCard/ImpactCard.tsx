import { RiGlobeLine, RiUserSmileLine, RiUserStarLine } from "@remixicon/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { sentenceCase } from "sentence-case";

import type { ImpactCardProps } from "./ImpactCard.interface";
import styles from "./ImpactCard.module.scss";

const impactIconMap: Record<string, ReactNode> = {
  experts: <RiUserStarLine className={styles["icon-size"]} />,
  countries: <RiGlobeLine className={styles["icon-size"]} />,
  users: <RiUserSmileLine className={styles["icon-size"]} />,
};

export const ImpactCard: FC<ImpactCardProps> = (props) => {
  return (
    <div className={clsx("col")}>
      <p
        className={clsx(
          "d-flex",
          "align-items-center",
          "justify-content-center",
        )}
      >
        <span
          className={clsx(
            "rounded-circle",
            "bg-light",
            "d-flex",
            "align-items-center",
            "justify-content-center",
            styles["icon-badge-size"],
          )}
        >
          {impactIconMap[props.icon]}
        </span>
      </p>
      <h4 role="impact-card-title" className={clsx("heading-s", "fw-bold")}>
        {sentenceCase(props.title)}
      </h4>
      <p>{props.subTitle}</p>
    </div>
  );
};
