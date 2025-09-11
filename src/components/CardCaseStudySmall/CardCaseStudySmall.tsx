import clsx from "clsx";
import type { FC } from "react";

import { Link } from "../Link/Link";
import type { CardCaseStudyProps } from "../CardCaseStudy/CardCaseStudy.interface";

export const CardCaseStudySmall: FC<CardCaseStudyProps> = (props) => {
  return (
    <div className={clsx("card", "bg-transparent", "border", "border-0")}>
      <div className={clsx("row", "g-0")}>
        <div className={clsx("col-sm-4")}>
          <img
            src={props.image.srcPath}
            className={clsx("img-fluid", "rounded")}
            alt={props.image.altText}
          />
        </div>
        <div className="col-sm-8">
          <div className="card-body">
            <h4
              className={clsx(
                "card-title",
                "heading-s",
                "pb-4",
                "border-bottom",
              )}
            >
              {props.title}
            </h4>
            <p className={clsx("card-text", "d-none", "d-sm-flex")}>
              {props.subTitle}
            </p>
            <p className={clsx("card-text")}>
              <Link
                className={clsx("card-link")}
                href={props.link.href}
                label={"View"}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
