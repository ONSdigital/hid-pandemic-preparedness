import type { FC } from "react";
import clsx from "clsx";

import { RiTimerLine } from "@remixicon/react";

import styles from "./LearningModule.module.scss";
import type { LearningModuleProps } from "./LearningModule.interface";
import { Tag } from "../Tag/Tag";
import { TextModule } from "../TextModule/TextModule";
import { Link } from "../Link/Link";

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
          "d-flex",
          "flex-column",
          "flex-md-row",
          "align-items-start",
          "align-items-md-center",
          "justify-content-between",
          "gap-3",
        )}
      >
        <div className="d-flex flex-wrap gap-2">
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
      <h1 className={clsx("heading-m")}>{props.title}</h1>
      <TextModule {...props} />
      <div
        className={clsx(
          "d-flex",
          "flex-column",
          "flex-lg-row",
          "justify-content-end",
          "gap-3",
        )}
      >
        <Link
          asButton={true}
          aria-label="Open GitHub"
          buttonVariant="primary"
          href={props.githubLinkHref}
          label="Open Github"
        />

        <Link
          asButton={true}
          aria-label="Start"
          buttonVariant="secondary"
          href={props.startLinkHref}
          label="Start"
        />
      </div>
    </div>
  );
};
