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
        <div className={clsx("row")}>
          <div className={clsx("col", "col-lg-auto", "mb-4", "mb-lg-0")}>
            <LearningModuleNav {...props.learningModule} />
          </div>
          <div
            className={clsx("col", "d-flex", "flex-column", "gap-4", "w-100")}
          >
            <Introduction {...props.introduction} />
            <LearningResourceBlock {...props.learningResource} />
          </div>
        </div>
      </div>
    </div>
  );
};
