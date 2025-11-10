import clsx from "clsx";
import type { FC } from "react";

import { TextModule } from "@components/Molecules/Core/TextModule/TextModule";

import type { SupportingInformationProps } from "./SupportingInformation.interface";
import styles from "./SupportingInformation.module.scss";

// Renders input `htmlContent` using the `TextModule` component
export const SupportingInformation: FC<SupportingInformationProps> = (
  props,
) => {
  return (
    <div className={clsx("w-100", styles["supporting-information-bg"], "py-4")}>
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
          <h3 className={clsx("heading-m")}>{props.title}</h3>
        </div>
        <hr />
        <div className={clsx("row")}>
          {props.content && <TextModule richText={props.content} />}
        </div>
      </div>
    </div>
  );
};
