import clsx from "clsx";
import type { FC } from "react";
import { useRef } from "react";

import { CopyButton } from "@src/components/Molecules/Core/CopyButton/CopyButton";

import type { FormulaProps } from "./Formula.interface";
import styles from "./Formula.module.scss";

export const Formula: FC<FormulaProps> = (props) => {
  const contentElement = useRef<HTMLDivElement>(null);

  return (
    <div
      className={clsx(
        "d-flex",
        "flex-row",
        "align-items-center",
        "ps-4",
        "py-3",
        // "my-4",
        "gap-2",
        styles["formula-container"],
      )}
    >
      <div className={clsx("fw-bold")} ref={contentElement}>
        {props.text}
      </div>
      <div>
        <CopyButton contentElement={contentElement} />
      </div>
    </div>
  );
};
