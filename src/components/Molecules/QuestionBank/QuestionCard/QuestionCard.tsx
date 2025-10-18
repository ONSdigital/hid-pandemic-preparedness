import clsx from "clsx";
import type { FC } from "react";
import { useRef } from "react";

import { TextModule } from "@components/TextModule/TextModule";
import { CopyButton } from "@components/Molecules/Core/CopyButton/CopyButton";
import type { QuestionData } from "@localTypes/QuestionData";
import styles from "./QuestionCard.module.scss";

export const QuestionCard: FC<QuestionData> = (props) => {
  const contentElement = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx("position-relative")}>
      <div
        ref={contentElement}
        className={clsx(
          "rounded",
          "py-3",
          "ps-4",
          styles["question-bg"],
          styles["copy-btn-space"],
        )}
        key={props.id}
      >
        <TextModule {...props} />
      </div>
      <CopyButton
        contentElement={contentElement}
        className={clsx("position-absolute", "top-0", "end-0", "mt-2")}
      />
    </div>
  );
};
