import type { FC } from "react";
import clsx from "clsx";

import styles from "./LearningModule.module.scss";
import { LearningModuleNav } from "../LearningModuleNav/LearningModuleNav";
import { LearningModuleCard } from "../LearningModuleCard/LearningModuleCard";
import type { LearningModuleProps } from "./LearningModule.interface";

export const LearningModule: FC<LearningModuleProps> = (props) => {
  return (
    <div
      className={clsx(
        "px-3",
        "px-lg-5",
        "py-5",
        "gap-3",
        "gap-lg-5",
        "w-100",
        styles["learning-module__container"],
      )}
    >
      <div
        className={clsx(
          "d-flex",
          "flex-column",
          "flex-lg-row",
          styles["container-lg"],
        )}
      >
        <LearningModuleNav {...props.navProps} />
        <LearningModuleCard {...props.cardProps} />
      </div>
    </div>
  );
};
