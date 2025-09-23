import clsx from "clsx";
import type { FC } from "react";

import { LearningModuleNav } from "@components/LearningModuleNav/LearningModuleNav";
import { LearningModuleCard } from "@components/LearningModuleCard/LearningModuleCard";

import type { LearningModuleProps } from "./LearningModule.interface";
import styles from "./LearningModule.module.scss";

export const LearningModule: FC<LearningModuleProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["learning-module-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3")}>
            <LearningModuleNav {...props.navProps} />
          </div>
          <div className={clsx("col-md-9")}>
            <LearningModuleCard {...props.cardProps} />
          </div>
        </div>
      </div>
    </div>
  );
};
