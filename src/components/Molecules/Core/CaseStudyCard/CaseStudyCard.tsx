import clsx from "clsx";
import type { FC } from "react";

import { Image } from "@components/Molecules/Core/Image/Image";
import { Link } from "@components/Molecules/Core/Link/Link";

import type { CaseStudyCardProps } from "./CaseStudyCard.interface";
import styles from "./CaseStudyCard.module.scss";
import { Tag } from "@/src/components/Molecules/Core/Tag/Tag";

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
      <div
        className={clsx(
          props.size === "small" && [
            "row",
            "row-cols-1",
            "row-cols-lg-2",
            "gx-0",
            "gx-lg-3",
          ],
        )}
      >
        <div
          className={clsx(props.size === "small" && "col", "position-relative")}
        >
          <Image
            {...props.image}
            className={clsx("card-img", styles["image"])}
          />
          <div
            className={clsx(
              "position-absolute",
              styles["tag-container"],
              props.size === "small" && styles["small-tag"],
            )}
          >
            <Tag {...props.tag} />
          </div>
        </div>
        <div className={clsx(props.size === "small" && "col")}>
          <div className={clsx("card-body", "p-0")}>
            <h4
              className={clsx(
                styles["title"],
                "card-title",
                "heading-s",
                "mt-3",
                props.size === "small" && "mt-lg-0",
              )}
            >
              {props.title}
            </h4>
            <p className={clsx("card-text", "mt-3")}>{props.subTitle}</p>
            {props.size === "large" && (
              <div className={clsx("d-none", "d-lg-block")}>
                <Link
                  asButton={true}
                  buttonVariant="secondary"
                  className={clsx(styles["link"], "card-link")}
                  {...props.link}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
