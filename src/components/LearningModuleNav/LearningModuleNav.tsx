import type { FC } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

import { Accordion } from "@src/components/Accordion/Accordion";
import { ChapterList } from "@src/components/Molecules/Core/ChapterList/ChapterList";
import { IconAndTextLink } from "@src/components/IconAndTextLink/IconAndTextLink";

import type { LearningModuleNavProps } from "./LearningModuleNav.interface";
import styles from "./LearningModuleNav.module.scss";

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
      <div className={clsx(styles["learning-module-nav__container"])}>
        <div className={clsx("d-flex", "flex-column", "gap-3", "mb-5")}>
          <IconAndTextLink href="/" icon="github" label="Open GITHUB" />
          <IconAndTextLink href="/" icon="pdf" label="Download PDF" />
          <IconAndTextLink href="/" icon="feedback" label="Feedback" />
          <IconAndTextLink href="/" icon="share" label="Share" />
        </div>

        {/*  Mobile view: chapterList inside accordian */}
        <div className={clsx("d-block", "d-lg-none")}>
          <Accordion {...accordionProps} />
        </div>

        {/* Desktop view: there is no accordian */}
        <div className={clsx("d-lg-block", "d-none")}>
          <h1 className={clsx("heading-xs", "fw-bold", "mb-3")}>
            {headingText}
          </h1>
          <ChapterList {...props} />
        </div>
      </div>
    </div>
  );
};
