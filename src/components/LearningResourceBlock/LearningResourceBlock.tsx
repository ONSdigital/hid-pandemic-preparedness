import clsx from "clsx";
import type { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./LearningResourceBlock.module.scss";
import type { LearningResourceBlockProps } from "@components/LearningResourceBlock/LearningResourceBlock.interface";
import { TextModule } from "@components/TextModule/TextModule";
import { Accordion } from "@components/Accordion/Accordion";
import type { AccordionProps } from "@components/Accordion/Accordion.interface";

export const LearningResourceBlock: FC<LearningResourceBlockProps> = (
  props,
) => {
  const accordionProps: AccordionProps = {
    id: uuidv4(),
    items: props.learningSections.map((section) => ({
      id: section.id,
      headerTitle: section.title,
      bodyContent: <TextModule htmlContent={section.htmlContent} />,
    })),
    expandAll: true,
  };
  return (
    <div
      className={clsx("w-100", styles["learning-resource-block__container"])}
    >
      <div className={clsx("px-2", "py-4", "p-lg-4")}>
        <Accordion {...accordionProps} variant="primary" />
      </div>
    </div>
  );
};
