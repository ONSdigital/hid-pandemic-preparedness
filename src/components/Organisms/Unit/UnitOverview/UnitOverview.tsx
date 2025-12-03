import { RiArrowRightLine, RiTimerLine } from "@remixicon/react";

import clsx from "clsx";
import type { FC } from "react";

import { Button } from "@src/components/Button/Button";
import { Link } from "@src/components/Molecules/Core/Link/Link";
import { Tag } from "@/src/components/Molecules/Core/Tag/Tag";
import { Dynamic } from "@src/components/Organisms/Dynamic/Dynamic";

import strings from "@src/content/strings.json";

import styles from "./UnitOverview.module.scss";
import type { UnitOverviewProps } from "./UnitOverview.interface";

// Set size of icon here using icon component props
const iconSize: string = "1.5rem";

export const UnitOverview: FC<UnitOverviewProps> = (props) => {
  const overviewStrings = strings.unit.overview;

  return (
    <div
      className={clsx(
        "border",
        "rounded",
        "p-4",
        "p-lg-5",
        styles["container-bg"],
      )}
    >
      <div className={clsx("row")}>
        <div className={clsx("col-12")}>
          <div className={clsx("d-flex", "flex-row", "mb-3", "gap-2")}>
            {props.tags &&
              props.tags.map((tag) => (
                <div key={tag.id}>
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
        <h3 className={clsx("heading-m", "mt-4", "mb-0")}>{props.title}</h3>
        <hr className={clsx(styles["hr-m"])} />
        <div className={clsx("col-12")}>
          <Dynamic content={props.content} />
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
            {props.githubLink && (
              <div data-testid="github-link">
                <Link
                  {...props.githubLink}
                  asButton={true}
                  aria-label={props.githubLink.title}
                  buttonVariant="primary"
                />
              </div>
            )}
            <Button
              className="fw-medium"
              ariaLabel={overviewStrings.start}
              children={
                <>
                  {overviewStrings.start} <RiArrowRightLine />
                </>
              }
              type="button"
              variant="secondary"
              onClick={props.onNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
