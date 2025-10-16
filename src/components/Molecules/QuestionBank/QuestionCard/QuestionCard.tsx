import clsx from "clsx";
import type { FC } from "react";
import { useRef } from "react";

import { TextModule } from "@components/TextModule/TextModule";
import type { QuestionData } from "@localTypes/QuestionData";
import styles from "./QuestionCard.module.scss";
import { CopyButton } from "@/src/components/Molecules/Core/CopyButton/CopyButton";

export const QuestionCard: FC<QuestionData> = (props) => {
  const contentElement = useRef<HTMLInputElement>(null);
  return (
    <div className={clsx("position-relative")}>
      <div
        ref={contentElement}
        className={clsx(
          "rounded",
          "py-2",
          "ps-4",
          styles["question-bg"],
          styles["copy-btn-space"],
        )}
        key={props.id}
      >
        <TextModule {...props} />
      </div>
      <CopyButton
        className={clsx("position-absolute", "top-0", "end-0", "mt-2", "me-4")}
        contentElement={contentElement}
      />
    </div>
  );
};
