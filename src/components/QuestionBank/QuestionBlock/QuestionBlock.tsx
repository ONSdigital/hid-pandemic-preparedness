import clsx from "clsx";
import type { FC } from "react";

import { Tag } from "../../Tag/Tag";
import { TextModule } from "../../TextModule/TextModule";
import type { QuestionBlockProps } from "./QuestionBlock.interface";
import styles from "./QuestionBlock.module.scss";

export const QuestionBlock: FC<QuestionBlockProps> = (props) => {
  return (
    <div className={clsx("p-4", "border", "rounded", styles["border-color"])}>
      <div className={clsx("d-inline-flex", "pt-4", "pb-2")}>
        {props.tags.map((tag) => (
          <Tag {...tag} />
        ))}
      </div>
      <hr />
      <div className={clsx("d-flex", "py-4")}>
        <h5 className={clsx("heading-xs")}>{props.title}</h5>
      </div>
      <div className={clsx("d-flex", "flex-column", "gap-2")}>
        {props.questions.map((question) => (
          <div
            className={clsx("rounded", "py-2", "px-4", styles["question-bg"])}
            key={question.id}
          >
            <TextModule {...question} />
          </div>
        ))}
      </div>
    </div>
  );
};
