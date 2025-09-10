import clsx from "clsx";
import type { FC } from "react";

import type { CardStatProps } from "./CardStat.interface";
import styles from "./CardStat.module.scss";

export const CardStat: FC<CardStatProps> = (props) => {
  return (
    <div className={clsx("card", styles["card-stat"], "py-4")}>
      <div className={clsx("card-body")}>
        <h3 className={clsx("heading-m", "text-primary")}>{props.title}</h3>
        <p className={clsx("card-text", "border-bottom", "py-4")}>
          {props.subTitle}{" "}
          <a
            className={clsx("link-underline", "link-underline-opacity-0")}
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
