import type { FC } from "react";
import clsx from "clsx";

import { RiTimerLine } from "@remixicon/react";

import styles from "./LearningModuleCard.module.scss";
import type { LearningModuleCardProps } from "./LearningModuleCard.interface";
import { Tag } from "../Tag/Tag";
import { TextModule } from "../TextModule/TextModule";
import { Link } from "../Link/Link";

// Set size of icon here using icon component props
const iconSize: string = "1.5rem";

export const LearningModuleCard: FC<LearningModuleCardProps> = (props) => {
  return (
    <div
      className={clsx(
        "container",
        "w-100",
        "border",
        "rounded",
        "p-4",
        styles["container-bg"],
      )}
    >
      <div className={clsx("row")}>
        <div className={clsx("col-12")}>
          <div className={clsx("d-flex", "flex-row", "mb-3", "gap-2")}>
            {props.tags.map((tag) => (
              <div key={tag.id}>
                <Tag {...tag} />
              </div>
            ))}
            <div className={clsx("ms-auto", "d-none", "d-md-inline")}>
              <span className={clsx("p-2", styles["icon-bg"])}>
                <RiTimerLine size={iconSize} />
              </span>{" "}
              {props.readingTime}
            </div>
          </div>
        </div>
      </div>
      <div className={clsx("row")}>
        <div className={clsx("col-12")}>
          <h1 className={clsx("heading-m")}>{props.title}</h1>
          <hr />
          <TextModule {...props} />
        </div>
      </div>
      <div className={clsx("row")}>
        <div className={clsx("col-12")}>
          <div
            className={clsx(
              "d-flex",
              "flex-column",
              "flex-lg-row",
              "justify-content-end",
              "gap-4",
            )}
          >
            <Link
              {...props.githubLink}
              asButton={true}
              aria-label={props.githubLink.label}
              buttonVariant="primary"
            />
            <Link
              {...props.startLink}
              asButton={true}
              aria-label="Start"
              buttonVariant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
