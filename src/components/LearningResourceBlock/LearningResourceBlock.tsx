import clsx from "clsx";
import type { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./LearningResourceBlock.module.scss";
import type { LearningResourceBlockProps } from "./LearningResourceBlock.interface";
import { TextModule } from "@components/TextModule/TextModule";
import { Accordion } from "@components/Accordion/Accordion";

export const LearningResourceBlock: FC<LearningResourceBlockProps> = (
  props,
) => {
  const accordionProps = {
    id: uuidv4(),
    items: props.learningResources.map((resource) => ({
      id: resource.id,
      headerTitle: resource.title,
      bodyContent: <TextModule htmlContent={resource.htmlContent} />,
    })),
  };
  return (
    <div className={clsx(styles["learning-resource-block__container"])}>
      <div className={clsx("px-2", "py-4", "p-lg-5")}>
        <Accordion {...accordionProps} variant="primary" />
      </div>
    </div>
  );
};
