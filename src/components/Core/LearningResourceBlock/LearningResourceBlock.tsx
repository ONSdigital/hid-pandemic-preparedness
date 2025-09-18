import clsx from "clsx";
import type { FC } from "react";

import styles from "./LearningResourceBlock.module.scss";
import type { LearningResourceBlockProps } from "./LearningResourceBlock.interface";

export const LearningResourceBlock: FC<LearningResourceBlockProps> = (
  props,
) => {
  return (
    <div
      className={clsx("w-100", styles["learning-resource-block__container"])}
    >
      <h1>HELLO</h1>
    </div>
  );
};
