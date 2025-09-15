import clsx from "clsx";
import type { FC } from "react";

import { Link } from "../../Link/Link";
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
          "text-primary",
        )}
      >
        <div className={clsx("row", "justify-content-end", "py-2")}>
          <div className={clsx("col-md-8")}>
            <h3 className={clsx("heading-m")}>{props.title}</h3>
          </div>
        </div>
        <div className={clsx("row", "justify-content-end", "py-2")}>
          <div className={clsx("col-md-8")}>
            <p>{props.subTitle}</p>
          </div>
        </div>
        <div className={clsx("row", "justify-content-end", "py-2")}>
          <div className={clsx("col-md-8")}>
            <Link asButton={true} buttonVariant="secondary" {...props.link} />
          </div>
        </div>
      </div>
    </div>
  );
};
