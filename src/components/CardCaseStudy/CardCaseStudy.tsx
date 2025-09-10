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
        "border",
        "border-0",
      )}
    >
      <img
        src={props.image.srcPath}
        className={clsx("card-img-top", "rounded-bottom")}
        alt={props.image.altText}
      />
      <div className={clsx("card-body", "px-0")}>
        <h4
          className={clsx("card-title", "heading-s", "py-4", "border-bottom")}
        >
          {props.title}
        </h4>
        <p className={clsx("card-text", "py-4")}>{props.subTitle}</p>
        <ul className={clsx("list-group", "list-group-flush")}>
          <li className={clsx("list-group-item", "border", "border-0", "pb-4")}>
            <Link
              className={clsx("card-link")}
              href={props.link.href}
              label={"View"}
            />
          </li>
          <li className={clsx("list-group-item", "border", "border-0", "pt-4")}>
            <Link
              className={clsx("card-link")}
              asButton={true}
              buttonVariant={"secondary"}
              href={props.link.href}
              label={props.link.label}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
