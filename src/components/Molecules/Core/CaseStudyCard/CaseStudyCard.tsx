import clsx from "clsx";
import type { FC } from "react";

import { Image } from "@src/components/Molecules/Core/Image/Image";
import { Link } from "@src/components/Molecules/Core/Link/Link";

import type { CaseStudyCardProps } from "./CaseStudyCard.interface";
import styles from "./CaseStudyCard.module.scss";

export const CaseStudyCard: FC<CaseStudyCardProps> = (props) => {
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
      <Image
        {...props.image}
        className={clsx("card-img", styles["card-case-study__image"])}
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
            asButton={true}
            buttonVariant="secondary"
            className={clsx(styles["card-case-study__link"], "card-link")}
            {...props.link}
          />
        </div>
      </div>
    </div>
  );
};
