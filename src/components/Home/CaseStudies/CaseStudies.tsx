import type { FC } from "react";
import clsx from "clsx";

import type { CaseStudiesProps } from "./CaseStudies.interface";
import { CardCaseStudy } from "../../CardCaseStudy/CardCaseStudy";
import { CardCaseStudySmall } from "../../CardCaseStudySmall/CardCaseStudySmall";
import styles from "./CaseStudies.module.scss";

export const CaseStudies: FC<CaseStudiesProps> = (props) => {
  return (
    <div className={clsx(styles["case-studies__container"])}>
      <div className={clsx("mb-5", "row")}>
        <h4 className={clsx("heading-l")}>{props.title}</h4>
      </div>
      <div className={clsx("row", "row-cols-1", "row-cols-lg-2")}>
        <div className={clsx("col")}>
          <CardCaseStudy {...props.mainCard} />
        </div>
        <div className={clsx("col", "d-flex", "flex-column", "gap-5")}>
          {props.smallCards.map((card) => (
            <CardCaseStudySmall key={card.id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};
