import clsx from "clsx";
import type { FC } from "react";

import { Tag } from "../../Tag/Tag";
import { TextModule } from "../../TextModule/TextModule";
import type { QuestionBlockProps } from "./QuestionBlock.interface";
// import styles from "./Explainer.module.scss";

export const QuestionBlock: FC<QuestionBlockProps> = (props) => {
  return (
    <div className={clsx("container")}>
      <div className={clsx("row")}>
        {props.tags.map((tag) => (
          <Tag {...tag} />
        ))}
      </div>
      <div className={clsx("row")}>
        <h5 className={clsx("heading-xs")}>{props.title}</h5>
      </div>
      {props.questions.map((question) => (
        <div className={clsx("row")} key={question.id}>
          <TextModule {...question} />
        </div>
      ))}
    </div>
  );
};
