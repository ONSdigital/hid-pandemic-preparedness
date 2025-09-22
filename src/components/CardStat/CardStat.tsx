import clsx from "clsx";
import type { FC } from "react";

import type { CardStatProps } from "./CardStat.interface";
import styles from "./CardStat.module.scss";

export const CardStat: FC<CardStatProps> = (props) => {
  return (
    <div
      className={clsx(
        "card",
        "border",
        "border-0",
        "p-4",
        "rounded-4",
        "shadow",
        styles["card-stat"],
      )}
    >
      <div className={clsx("card-body")}>
        <h3 className={clsx("heading-m", "text-primary")}>{props.title}</h3>
        <p
          className={clsx(
            "card-text",
            "border-black",
            "mb-4",
            "pb-3",
            "pt-4",
            styles["short-border-bottom"],
          )}
        >
          {props.subTitle}{" "}
          <a
            className={clsx(
              styles["card-stat-ref-link"],
              "link-underline",
              "link-underline-opacity-0",
            )}
            href={props.link.href}
          >
            ({props.link.label})
          </a>
        </p>
        <img
          className={clsx("card-img-bottom")}
          src={props.image.srcPath}
          alt={props.image.altText}
        ></img>
      </div>
    </div>
  );
};
