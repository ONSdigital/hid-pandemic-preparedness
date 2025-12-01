import { v4 as uuidv4 } from "uuid";
import { RiTimerLine } from "@remixicon/react";
import clsx from "clsx";
import type { FC } from "react";

import type { CardUnitProps } from "./CardUnit.interface";
import styles from "../CardUnit/CardUnit.module.scss";
import { Tag } from "@src/components/Molecules/Core/Tag/Tag";
import { Link } from "@src/components/Molecules/Core/Link/Link";
import { getTags } from "@src/helpers/getTags";

// Set size of icon here using icon component props
const iconSize: string = "1.5rem";

export const CardUnit: FC<CardUnitProps> = (props) => {
  const story = props.link?.story;

  if (!story) return;

  let tags = undefined;
  let readingTime = undefined;

  if ("tag_list" in story) {
    tags =
      story.tag_list &&
      getTags(story).sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
  }

  if ("content" in story) {
    readingTime = story.content.chapters[0]?.readingTime;
  }

  return (
    <div
      className={clsx(
        "card",
        styles["card-unit"],
        "shadow",
        "p-2",
        "rounded-4",
      )}
    >
      <div className={clsx("card-body")}>
        <h3 className={clsx("card-title", styles["title-height"])}>
          <Link
            className={clsx("fw-semibold", styles["card-unit-link"])}
            hideIcon={true}
            label={props.link.story?.name}
            {...props.link}
          />
        </h3>
        <p className={clsx("card-text")}>{props.subTitle}</p>
      </div>

      <div className={clsx("card-footer", styles["unit-card-footer"])}>
        {tags && tags.length > 0 && (
          <div
            className={clsx(
              "border-top",
              "border-bottom",
              "d-flex",
              "gap-2",
              "py-3",
              "flex-wrap",
            )}
          >
            {tags.map((item) => (
              <Tag {...item} key={uuidv4()} />
            ))}
          </div>
        )}

        {readingTime && (
          <div
            className={clsx("align-items-center", "d-flex", "gap-2", "py-3")}
          >
            <div
              className={clsx(
                styles["time-box"],
                "rounded-1",
                "d-flex",
                "align-items-center",
                "justify-content-center",
              )}
            >
              <RiTimerLine size={iconSize} />
            </div>
            {readingTime}
          </div>
        )}
      </div>
    </div>
  );
};
