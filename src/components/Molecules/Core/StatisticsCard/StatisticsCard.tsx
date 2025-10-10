import clsx from "clsx";
import type { FC } from "react";

import { Image } from "@src/components/Molecules/Core/Image/Image";
import { Reference } from "@src/components/Molecules/Core/Reference/Reference";

import type { StatisticsCardProps } from "./StatisticsCard.interface";
import styles from "./StatisticsCard.module.scss";

export const StatisticsCard: FC<StatisticsCardProps> = (props) => {
  return (
    <div
      className={clsx(
        "card",
        "border",
        "border-0",
        "rounded-4",
        "shadow",
        styles["card-stat"],
      )}
    >
      <div className={clsx("card-body")}>
        <h3 className={clsx("heading-m", "text-primary")}>{props.title}</h3>
        <p
          className={clsx(
            "card-text",
            "border-black",
            "mb-4",
            "pb-3",
            "pt-4",
            styles["short-border-bottom"],
          )}
        >
          {props.subTitle} <Reference {...props.reference} />
        </p>
        <Image {...props.image} className={clsx("card-img-bottom")} />
      </div>
    </div>
  );
};
