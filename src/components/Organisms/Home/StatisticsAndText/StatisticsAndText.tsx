import type { FC } from "react";
import clsx from "clsx";

import { StatisticsCard } from "@/src/components/Molecules/Core/StatisticsCard/StatisticsCard";
import { Link } from "@src/components/Molecules/Core/Link/Link";
import { Reference } from "@src/components/Molecules/Core/Reference/Reference";

import type { StatisticsAndTextProps } from "./StatisticsAndText.interface";
import styles from "./StatisticsAndText.module.scss";

export const StatisticsAndText: FC<StatisticsAndTextProps> = (props) => {
  return (
    <div className={clsx("w-100", "py-lg-2", styles["statistics-and-text-bg"])}>
      <div className={clsx("container-lg", "py-5")}>
        <div className={clsx("row")}>
          <div className={clsx("col-xxl-5", "pb-5")}>
            <p
              className={clsx(
                "fw-bold",
                "text-uppercase",
                styles["statistics-and-text__subtitle"],
              )}
            >
              {props.subTitle}
            </p>
            <h2 className={clsx("heading-l")}>{props.title}</h2>
            <p className={clsx("fst-italic", "heading-s", "mt-4")}>
              '{props.quotation}'
            </p>
            <p className={clsx("mt-2")}>
              {props.reference[0].websiteAuthor}{" "}
              <Reference {...props.reference[0]} />
            </p>
            <Link
              asButton={true}
              buttonVariant="secondary"
              className={clsx("mt-5")}
              {...props.link}
            />
          </div>
          <div className={clsx("col-xxl-7", "col-xl-10")}>
            <div className={clsx("row", "g-5")}>
              {props.cards.map((card) => (
                <div key={card._uid} className={clsx("col-md-6", "d-flex")}>
                  <StatisticsCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
