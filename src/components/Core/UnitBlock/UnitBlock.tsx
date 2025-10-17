import clsx from "clsx";
import type { FC } from "react";

import { CardUnit } from "@/src/components/Molecules/Core/CardUnit/CardUnit";
import type { UnitBlockProps } from "./UnitBlock.interface";
import styles from "./UnitBlock.module.scss";

export const UnitBlock: FC<UnitBlockProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["unit-block-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row", "py-4")}>
          <h3 className={clsx("heading-m")}>{props.title}</h3>
        </div>
        <div
          className={clsx(
            "d-flex",
            "flex-row",
            "flex-wrap",
            "gap-4",
            "py-4",
            "justify-content-center",
            "justify-content-md-start",
          )}
        >
          {props.units.map((unit) => (
            <CardUnit key={unit.id} {...unit} />
          ))}
        </div>
      </div>
    </div>
  );
};
