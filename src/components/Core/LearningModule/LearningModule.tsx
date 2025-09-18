import clsx from "clsx";
import type { FC } from "react";

import { LearningModuleNav } from "@components/LearningModuleNav/LearningModuleNav";
import { LearningModuleCard } from "@components/LearningModuleCard/LearningModuleCard";

import type { LearningModuleProps } from "./LearningModule.interface";
import styles from "./LearningModule.module.scss";

export const LearningModule: FC<LearningModuleProps> = (props) => {
  return (
    <div
      className={clsx(
        "px-lg-5",
        "py-5",
        "gap-3",
        "gap-lg-5",
        "w-100",
        styles["learning-module__container"],
      )}
    >
      <div
        className={clsx("container-lg", "d-flex", "flex-column", "flex-lg-row")}
      >
        <LearningModuleNav {...props.navProps} />

        <LearningModuleCard {...props.cardProps} />
      </div>
    </div>
  );
};
