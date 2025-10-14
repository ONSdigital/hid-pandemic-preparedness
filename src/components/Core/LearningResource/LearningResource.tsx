import clsx from "clsx";
import type { FC } from "react";

import { Congratulations } from "@components/Congratulations/Congratulations";
import { Introduction } from "@components/Core/Introduction/Introduction";
import type { LearningResourceProps } from "@components/Core/LearningResource/LearningResource.interface";
import { LearningModuleNav } from "@components/LearningModuleNav/LearningModuleNav";
import { LearningResourceBlock } from "@components/LearningResourceBlock/LearningResourceBlock";
import { Link } from "@components/Link/Link";

import styles from "./LearningResource.module.scss";

export const LearningResource: FC<LearningResourceProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["learning-resource__container"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3")}>
            <LearningModuleNav {...props.learningModuleNav} />
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            <Introduction {...props.introduction} />
            <LearningResourceBlock {...props.learningResource} />
            {props.currentChapter === props.totalChapters && (
              <Congratulations
                title={props.congratulations.title}
                htmlContent={props.congratulations.htmlContent}
              />
            )}
            <div className={clsx("d-flex", "justify-content-center")}>
              <Link {...props.link} asButton={true} buttonVariant="secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
