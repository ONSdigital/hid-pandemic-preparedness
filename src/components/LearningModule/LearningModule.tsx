import type { FC } from "react";
import clsx from "clsx";

import styles from "./LearningModule.module.scss";
import type { LearningModuleProps } from "./LearningModule.interface";
import { Tag } from "../Tag/Tag";
import { RiTimerLine } from "@remixicon/react";

// Set size of icon here using icon component props
const iconSize: string = "1.5rem";

export const LearningModule: FC<LearningModuleProps> = (props) => {
  return (
    <div
      className={clsx(
        "p-5",
        "d-flex",
        "flex-column",
        "gap-4",
        styles["learning-module__container"],
      )}
    >
      <div
        className={clsx(
          "align-items-center",
          "d-flex",
          "justify-content-between",
        )}
      >
        <div className="d-flex gap-2">
          {props.tags.map((tag) => (
            <Tag key={tag.id} {...tag} />
          ))}
        </div>
        <div
          className={clsx(
            "align-items-center",
            "d-flex",
            "gap-2",
            "justify-content-center",
            "rounded",
          )}
        >
          <div className={clsx(styles["learning-module__time-box"], "p-2")}>
            <RiTimerLine size={iconSize} />
          </div>

          <span>{props.readingTime}</span>
        </div>
      </div>
      <h1 className={(clsx("mb-3"), "heading-m")}>{props.title}</h1>
      <div>
        <span className={clsx("body-regular")}>{props.textRegular}</span>
        <span className={clsx("body-bold")}>{props.textBold}</span>
      </div>
      <div>
        <h1 className={clsx("mb-3", "heading-s")}>
          {props.learningOutcomesTitle}
        </h1>
        <ul className="ps-3">
          {props.learningOutcomesList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
