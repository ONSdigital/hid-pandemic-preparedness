import clsx from "clsx";
import type { FC } from "react";

import { Tag } from "@components/Tag/Tag";
import type { QuestionBlockProps } from "./QuestionBlock.interface";
import styles from "./QuestionBlock.module.scss";
import { QuestionCard } from "@/src/components/Molecules/QuestionBank/QuestionCard/QuestionCard";

export const QuestionBlock: FC<QuestionBlockProps> = (props) => {
  return (
    <div
      className={clsx("p-4", "border", "rounded", styles["question-block-bg"])}
    >
      <div className={clsx("d-inline-flex", "pt-4", "pb-2", "mw-100")}>
        {props.tags.map((tag) => (
          <Tag {...tag} key={tag.id} />
        ))}
      </div>
      <hr />
      <div className={clsx("d-flex", "py-4")}>
        <h5 className={clsx("heading-xs")}>{props.title}</h5>
      </div>
      <div className={clsx("d-flex", "flex-column", "gap-2")}>
        {props.questions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
    </div>
  );
};
