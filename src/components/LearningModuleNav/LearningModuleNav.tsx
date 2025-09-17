import type { FC } from "react";
import clsx from "clsx";

import { IconAndTextLink } from "../IconAndTextLink/IconAndTextLink";
import type { LearningModuleNavProps } from "./LearningModuleNav.interface";
import { ChapterList } from "../ChapterList/ChapterList";
import styles from "./LearningModuleNav.module.scss";

export const LearningModuleNav: FC<LearningModuleNavProps> = (props) => {
  return (
    <div
      className={clsx("container-lg", styles["learning-module-nav__container"])}
    >
      <div className={clsx("d-flex", "flex-column", "gap-5")}>
        <div className={clsx("d-flex", "flex-column", "gap-3")}>
          <IconAndTextLink href="/" icon="github" label="Open GITHUB" />
          <IconAndTextLink href="/" icon="pdf" label="Download PDF" />
          <IconAndTextLink href="/" icon="feedback" label="Feedback" />
          <IconAndTextLink href="/" icon="share" label="Share" />
        </div>
        <div className={clsx("d-flex", "flex-column", "gap-3")}>
          <h1 className={clsx("heading-s", "d-block", "d-lg-none")}>
            Chapters
          </h1>
          <h1 className={clsx("heading-xs", "fw-bold", "d-none", "d-lg-block")}>
            Chapters
          </h1>
          <ChapterList {...props} />
        </div>
      </div>
    </div>
  );
};
