import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@components/Link/Link";
import { TextModule } from "@components/TextModule/TextModule";

import type { GuideProps } from "./Guide.interface";
import styles from "./Guide.module.scss";

// Renders input `htmlContent` using the `TextModule` component
export const Guide: FC<GuideProps> = (props) => {
  return (
    <div
      className={clsx(
        "container-lg",
        "border",
        "rounded",
        "py-4",
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
        <Link {...props.bottomLink} />
      </div>
    </div>
  );
};
