import type { FC } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

import { IconAndTextLink } from "../IconAndTextLink/IconAndTextLink";
import type { LearningModuleNavProps } from "./LearningModuleNav.interface";
import { ChapterList } from "../ChapterList/ChapterList";
import styles from "./LearningModuleNav.module.scss";
import { Accordion } from "../Accordion/Accordion";

export const LearningModuleNav: FC<LearningModuleNavProps> = (props) => {
  const accordionId = uuidv4();
  const accordionItemId = uuidv4();
  const headingText = "Chapters";

  const accordionProps = {
    id: accordionId,
    items: [
      {
        id: accordionItemId,
        headerTitle: headingText,
        bodyContent: <ChapterList {...props} />,
      },
    ],
  };
  return (
    <div className="w-100">
      <div
        className={clsx(
          "container-lg",
          styles["learning-module-nav__container"],
        )}
      >
        <div className={clsx("d-flex", "flex-column", "gap-5")}>
          <div className={clsx("d-flex", "flex-column", "gap-3")}>
            <IconAndTextLink href="/" icon="github" label="Open GITHUB" />
            <IconAndTextLink href="/" icon="pdf" label="Download PDF" />
            <IconAndTextLink href="/" icon="feedback" label="Feedback" />
            <IconAndTextLink href="/" icon="share" label="Share" />
          </div>
          <div className={clsx("d-flex", "flex-column", "gap-3")}>
            {/*  Mobile view: chapterList inside accordian */}
            <div className={clsx("d-block", "d-lg-none")}>
              <Accordion {...accordionProps} />
            </div>

            {/* Desktop view: there is no accordian */}
            <div className={clsx("d-none", "d-lg-block")}>
              <h1 className={clsx("heading-xs", "fw-bold")}>{headingText}</h1>
              <ChapterList {...props} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
