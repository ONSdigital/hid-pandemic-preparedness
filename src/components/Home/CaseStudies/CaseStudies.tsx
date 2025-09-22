import type { FC } from "react";
import clsx from "clsx";

import { CardCaseStudy } from "@components/CardCaseStudy/CardCaseStudy";
import { CardCaseStudySmall } from "@components/CardCaseStudySmall/CardCaseStudySmall";
import { Link } from "@components/Link/Link";

import type { CaseStudiesProps } from "./CaseStudies.interface";
import styles from "./CaseStudies.module.scss";

export const CaseStudies: FC<CaseStudiesProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["case-studies-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row", "py-2")}>
          <div className={clsx("col-md-4")}>
            <h4 className={clsx("heading-l")}>{props.title}</h4>
          </div>
        </div>
        <div className={clsx("row", "py-4")}>
          <div className={clsx("col-md-4", "pb-4")}>
            <CardCaseStudy {...props.mainCard} />
          </div>
          <div className={clsx("col-md-8")}>
            <div
              className={clsx(
                "d-flex",
                "flex-column",
                "align-items-end",
                "gap-4",
              )}
            >
              {props.smallCards.map((card) => (
                <CardCaseStudySmall key={card.id} {...card} />
              ))}
            </div>
          </div>
        </div>
        <div className={clsx("row", "d-md-none")}>
          <div className={clsx("d-flex", "flex-row", "align-items-center")}>
            <Link
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
