import clsx from "clsx";
import type { FC } from "react";

import type { CardCaseStudyProps } from "../CardCaseStudy/CardCaseStudy.interface";
import styles from "./CardCaseStudySmall.module.scss";

export const CardCaseStudySmall: FC<CardCaseStudyProps> = (props) => {
  return (
    <div
      className={clsx(
        "card",
        styles["card-case-study-small"],
        "bg-transparent",
        "border-0",
        "py-2",
      )}
    >
      <div
        className={clsx(
          "row",
          "row-cols-1",
          "row-cols-lg-2",
          "gx-0",
          "gx-lg-3",
        )}
      >
        <div className="col">
          <img
            src={props.image.srcPath}
            className={clsx("card-img", styles["card-case-study-small__image"])}
            alt={props.image.altText}
          />
        </div>
        <div className="col">
          <div className={clsx("card-body", "p-0")}>
            <h4
              className={clsx(
                styles["card-case-study-small__title"],
                "card-title",
                "heading-s",
                "mt-3",
                "mt-lg-0",
              )}
            >
              {props.title}
            </h4>
            <p className={clsx("card-text", "body-regular", "mt-4")}>
              {props.subTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
