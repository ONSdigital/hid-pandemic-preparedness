import clsx from "clsx";
import type { FC } from "react";

import { TextModule } from "@src/components/Molecules/Core/TextModule/TextModule";

import styles from "./FullWidthRichText.module.scss";
import type { FullWidthRichTextProps } from "./FullWidthRichText.interface";

export const FullWidthRichText: FC<FullWidthRichTextProps> = (props) => {
  return (
    <div className={clsx("w-100", "py-4", styles["full-width-bg"])}>
      <div
        className={clsx(
          "container-lg",
          "border",
          "rounded",
          "p-4",
          styles["container"],
        )}
      >
        <div className={clsx("row")}>
          <TextModule richText={props.content} />
        </div>
      </div>
    </div>
  );
};
