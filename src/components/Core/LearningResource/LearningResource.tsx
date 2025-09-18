import type { FC } from "react";
import clsx from "clsx";

import styles from "./LearningResource.module.scss";
import { LearningModuleNav } from "@components/LearningModuleNav/LearningModuleNav";
import { Introduction } from "@components/Core/Introduction/Introduction";
import { LearningResourceBlock } from "@components/LearningResourceBlock/LearningResourceBlock";
import type { LearningResourceProps } from "./LearningResource.interface";

export const LearningResource: FC<LearningResourceProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["learning-resource__container"])}>
      <div className={clsx("container-lg", "py-4", "p-lg-5")}>
        <div className={clsx("row", "row-cols-1", "row-cols-lg-2")}>
          <div className="col">
            <LearningModuleNav {...props.learningModuleNavProps} />
          </div>
          <div
            className={clsx("col", "d-flex", "flex-column", "gy-4", "gy-lg-0")}
          >
            <Introduction {...props.introductionProps} />
            <LearningResourceBlock {...props.learningResourceBlockProps} />
          </div>
        </div>
      </div>
    </div>
  );
};
