import type { FC } from "react";
import clsx from "clsx";

import type { StatisticsAndTextProps } from "./StatisticsAndText.interface";
import { CardStat } from "@components/CardStat/CardStat";
import { Link } from "@components/Link/Link";
import styles from "./StatisticsAndText.module.scss";

export const StatisticsAndText: FC<StatisticsAndTextProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["statistics-and-text-bg"])}>
      <div className={clsx("container-lg")}>
        <div className={clsx("row")}>
          <div className={clsx("col-lg-5")}>
            <h1
              className={clsx(
                "fw-bold",
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
            <p className={clsx("mt-2")}>
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
              {...props.buttonLink}
            />
          </div>
          <div className={clsx("col-lg-7")}>
            <div className={clsx("row", "g-5", "justify-content-center")}>
              {props.statisticCards.map((card) => (
                <div
                  key={card.id}
                  className={clsx(
                    "col-auto",
                    "d-flex",
                    "justify-content-center",
                  )}
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
