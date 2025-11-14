import type { FC } from "react";
import clsx from "clsx";

import { CaseStudyCard } from "@src/components/Molecules/Core/CaseStudyCard/CaseStudyCard";
import { Link } from "@src/components/Molecules/Core/Link/Link";

import type { CaseStudiesProps } from "./CaseStudies.interface";
import styles from "./CaseStudies.module.scss";

export const CaseStudies: FC<CaseStudiesProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["case-studies-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row", "py-2")}>
          <div className={clsx("col-lg-5")}>
            <h4 className={clsx("heading-l")}>{props.title}</h4>
          </div>
        </div>
        <div className={clsx("row", "py-4")}>
          <div className={clsx("col-lg-5", "pb-4")}>
            {/* Mapping here as storyblok sends this data through as arrary even if we specify a single blok */}
            {props.mainCard.map((card) => (
              <CaseStudyCard key={card._uid} {...card} size="large" />
            ))}
          </div>
          <div className={clsx("col-lg-7")}>
            <div
              className={clsx(
                "d-flex",
                "flex-column",
                "align-items-lg-end",
                "gap-4",
              )}
            >
              {props.smallCards.map((card) => (
                <CaseStudyCard key={card._uid} {...card} size="small" />
              ))}
            </div>
          </div>
        </div>
        <div className={clsx("row", "d-md-none")}>
          <div className={clsx("d-flex", "flex-row", "align-items-center")}>
            <Link
              asButton={true}
              buttonVariant="secondary"
              {...props.mainCard[0].link}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
