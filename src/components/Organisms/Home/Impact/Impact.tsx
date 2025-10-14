import clsx from "clsx";
import type { FC } from "react";
import { sentenceCase } from "sentence-case";

import { ImpactCard } from "@/src/components/Molecules/Home/ImpactCard/ImpactCard";

import type { ImpactProps } from "./Impact.interface";
import styles from "./Impact.module.scss";

export const Impact: FC<ImpactProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["impact-bg"], "py-4")}>
      <div
        className={clsx("container-lg", "text-center", styles["text-color"])}
      >
        <div className={clsx("row", "py-4")}>
          <h3 role={"impact-title"} className={clsx("heading-m")}>
            {sentenceCase(props.title)}
          </h3>
        </div>
        <div
          className={clsx("row", "row-cols-1", "row-cols-lg-3", "gx-5", "py-4")}
        >
          {props.cards.map((card) => (
            <ImpactCard {...card} key={card._uid} />
          ))}
        </div>
      </div>
    </div>
  );
};
