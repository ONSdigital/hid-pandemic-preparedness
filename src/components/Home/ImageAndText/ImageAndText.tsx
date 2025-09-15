import clsx from "clsx";
import type { FC } from "react";

import type { ImageAndTextProps } from "./ImageAndText.interface";
import styles from "./ImageAndText.module.scss";

export const ImageAndText: FC<ImageAndTextProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["impact-and-text-bg"])}>
      <div
        className={clsx(
          "container-lg",
          styles["impact-and-text-container"],
          "py-4",
        )}
      ></div>
    </div>
  );
};
