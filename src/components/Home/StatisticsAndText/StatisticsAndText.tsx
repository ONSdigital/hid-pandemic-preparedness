import type { FC } from "react";
import clsx from "clsx";

import type { StatisticsAndTextProps } from "./StatisticsAndText.interface";
import { CardStat } from "../../CardStat/CardStat";
import { Link } from "../../Link/Link";
import styles from "./StatisticsAndText.module.scss";

export const StatisticsAndText: FC<StatisticsAndTextProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["statistics-and-text-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row", "row-cols-1", "row-cols-lg-2")}>
          <div
            className={clsx(
              "col",
              "mb-5",
              "mb-lg-0",
              styles["statistics-and-text__content-container"],
            )}
          >
            <h1
              className={clsx(
                "body-bold",
                "text-uppercase",
                styles["statistics-and-text__subtitle"],
              )}
            >
              {props.subTitle}
            </h1>
            <h2 className={clsx("heading-l")}>{props.title}</h2>
            <p className={clsx("fst-italic", "heading-s", "mt-4")}>
              {props.quote}
            </p>
            <p className={clsx("body-regular", "mt-2")}>
              {props.attribution}{" "}
              <a
                className={clsx(
                  styles["statistics-and-text__ref-link"],
                  "link-underline",
                  "link-underline-opacity-0",
                )}
                href={props.attributionLink.href}
              >
                ({props.attributionLink.label})
              </a>
            </p>
            <Link
              asButton={true}
              buttonVariant="secondary"
              className={clsx("mt-5")}
              {...props.link}
            />
          </div>
          <div className="col">
            <div
              className={clsx(
                "row",
                "row-cols-1",
                "row-cols-lg-2",
                "g-4",
                "g-lg-4",
              )}
            >
              {props.statisticCards.map((card) => (
                <div
                  key={card.id}
                  className={clsx("col", "d-flex", "justify-content-center")}
                >
                  <CardStat {...card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
