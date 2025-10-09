import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@components/Link/Link";

import type { ImageAndTextProps } from "./ImageAndText.interface";
import styles from "./ImageAndText.module.scss";

export const ImageAndText: FC<ImageAndTextProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["image-and-text-bg"])}>
      <div className={clsx("container-lg", "text-primary")}>
        <div className={clsx("row", "py-lg-2")}>
          <div
            className={clsx(
              "col-lg-5",
              "d-flex",
              "justify-content-center",
              "position-relative",
              styles["image-container"],
            )}
          >
            <img
              className={styles["image-styles"]}
              src="./images/two-professionals-discussing-statistics.png"
            ></img>
          </div>
          <div className={clsx("col-lg-7", "py-4")}>
            <h3 className={clsx("heading-m", "py-2")}>{props.title}</h3>
            <p className={clsx("py-2", "fs-5")}>{props.subTitle}</p>
            <Link asButton={true} buttonVariant="secondary" {...props.link} />
          </div>
        </div>
      </div>
    </div>
  );
};
