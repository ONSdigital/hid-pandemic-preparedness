import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@components/Link/Link";
import { TextModule } from "@components/TextModule/TextModule";

import type { GuideProps } from "./Guide.interface";
import styles from "./Guide.module.scss";

// Renders input `htmlContent` using the `TextModule` component
export const Guide: FC<GuideProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["guide-bg"], "py-4")}>
      <div className={clsx("container-lg")}>
        <div className={clsx("row", "py-4")}>
          <div className={clsx("d-flex", "align-items-start", "flex-column")}>
            <Link
              {...props.topLink}
              asButton={true}
              buttonVariant="primary"
              goBack={true}
            />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "container-lg",
          "border",
          "rounded",
          "py-4",
          "bg-light",
          styles["container-border-color"],
        )}
      >
        <div className={clsx("row")}>
          <h3 className={clsx("heading-m")}>{props.topTitle}</h3>
        </div>
        <hr />
        <div className={clsx("row")}>
          <TextModule {...props.topContent} />
        </div>
        <div className={clsx("row")}>
          <h3 className={clsx("heading-m")}>{props.bottomTitle}</h3>
        </div>
        <hr />
        <div className={clsx("row")}>
          <TextModule {...props.bottomContent} />
        </div>
        <div className={clsx("row")}>
          <div className={clsx("d-flex", "align-items-end", "flex-column")}>
            <Link
              {...props.bottomLink}
              asButton={true}
              buttonVariant="secondary"
              goBack={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
