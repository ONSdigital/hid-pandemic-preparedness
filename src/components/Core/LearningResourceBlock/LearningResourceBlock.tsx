import clsx from "clsx";
import type { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./LearningResourceBlock.module.scss";
import type { LearningResourceBlockProps } from "./LearningResourceBlock.interface";
import { TextModule } from "../../TextModule/TextModule";
import { Accordion } from "../../Accordion/Accordion";

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
    <div
      className={clsx("w-100", styles["learning-resource-block__container"])}
    >
      <Accordion {...accordionProps} />
    </div>
  );
};
