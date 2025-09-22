import clsx from "clsx";
import type { FC } from "react";

import { Link } from "../Link/Link";
import type { CardCaseStudyProps } from "./CardCaseStudy.interface";
import styles from "./CardCaseStudy.module.scss";

export const CardCaseStudy: FC<CardCaseStudyProps> = (props) => {
  return (
    <div
      className={clsx(
        "card",
        styles["card-case-study"],
        "bg-transparent",
        "border-0",
        "py-2",
      )}
    >
      <img
        alt={props.image.altText}
        className={clsx("card-img", styles["card-case-study__image"])}
        src={props.image.srcPath}
      />
      <div className={clsx("card-body", "p-0")}>
        <h4
          className={clsx(
            styles["card-case-study__title"],
            "card-title",
            "heading-s",
            "mt-4",
          )}
        >
          {props.title}
        </h4>
        <p className={clsx("card-text", "body-regular", "mt-3")}>
          {props.subTitle}
        </p>
        <div className={clsx("d-none", "d-lg-block")}>
          <Link
            className={clsx(styles["card-case-study__link"], "card-link")}
            asButton={true}
            buttonVariant={"secondary"}
            href={props.link.href}
            label={props.link.label}
          />
        </div>
      </div>
    </div>
  );
};
