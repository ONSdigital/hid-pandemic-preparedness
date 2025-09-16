import type { FC } from "react";
import clsx from "clsx";

import type { CaseStudiesProps } from "./CaseStudies.interface";
import { CardCaseStudy } from "../../CardCaseStudy/CardCaseStudy";
import { CardCaseStudySmall } from "../../CardCaseStudySmall/CardCaseStudySmall";

import styles from "./CaseStudies.module.scss";
import { Link } from "../../Link/Link";

export const CaseStudies: FC<CaseStudiesProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["case-studies__container"])}>
      <div className="container-lg">
        <div className={clsx("mb-5", "row")}>
          <h4 className={clsx("heading-l")}>{props.title}</h4>
        </div>
        <div className={clsx("row", "row-cols-1", "row-cols-lg-2")}>
          <div className={clsx("col", "mb-5", "mb-lg-0")}>
            <CardCaseStudy {...props.mainCard} />
          </div>
          <div className={clsx("col", "d-flex", "flex-column", "gap-5")}>
            {props.smallCards.map((card) => (
              <CardCaseStudySmall key={card.id} {...card} />
            ))}
          </div>
          <div className={clsx("d-lg-none")}>
            <Link
              className={clsx(
                styles["card-case-study__link"],
                "card-link",
                "mt-5",
              )}
              asButton={true}
              buttonVariant={"secondary"}
              href={props.mainCard.link.href}
              label={props.mainCard.link.label}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
