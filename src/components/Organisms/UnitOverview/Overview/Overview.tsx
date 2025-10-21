import { RiTimerLine } from "@remixicon/react";
import { renderRichText } from "@storyblok/astro";
import type { FC } from "react";
import clsx from "clsx";

import { Link } from "@src/components/Link/Link";
import { Tag } from "@/src/components/Molecules/Core/Tag/Tag";
import { TextModule } from "@src/components/Molecules/Core/TextModule/TextModule";

import styles from "./Overview.module.scss";
import type { OverviewProps } from "./Overview.interface";

// Set size of icon here using icon component props
const iconSize: string = "1.5rem";

export const Overview: FC<OverviewProps> = (props) => {
  // Render the rich text content from props using Storyblok helper
  const renderedRichText = renderRichText(props.overviewRichText);

  return (
    <div
      className={clsx(
        "container",
        "w-100",
        "border",
        "rounded",
        "p-4",
        styles["container-bg"],
      )}
    >
      <div className={clsx("row")}>
        <div className={clsx("col-12")}>
          <div className={clsx("d-flex", "flex-row", "mb-3", "gap-2")}>
            {props.tags &&
              props.tags.map((tag) => (
                <div key={tag._uid}>
                  <Tag {...tag} />
                </div>
              ))}
            <div className={clsx("ms-auto", "d-none", "d-md-inline")}>
              <span className={clsx("p-2", styles["icon-bg"])}>
                <RiTimerLine size={iconSize} />
              </span>{" "}
              {props.readingTime}
            </div>
          </div>
        </div>
      </div>
      <div className={clsx("row")}>
        <div className={clsx("col-12")}>
          {renderedRichText && <TextModule htmlContent={renderedRichText} />}
        </div>
      </div>
      <div className={clsx("row")}>
        <div className={clsx("col-12")}>
          <div
            className={clsx(
              "d-flex",
              "flex-column",
              "flex-lg-row",
              "justify-content-end",
              "gap-4",
            )}
          >
            <Link
              {...props.githubLink}
              asButton={true}
              aria-label={props.githubLink.title}
              buttonVariant="primary"
            />
            {props.startLink && (
              <Link
                {...props.startLink}
                asButton={true}
                aria-label={props.startLink.title}
                buttonVariant="secondary"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
