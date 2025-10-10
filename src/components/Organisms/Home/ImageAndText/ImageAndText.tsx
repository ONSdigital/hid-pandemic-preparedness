import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@src/components/Molecules/Core/Link/Link";

import type { ImageAndTextProps } from "./ImageAndText.interface";
import styles from "./ImageAndText.module.scss";

export const ImageAndText: FC<ImageAndTextProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["image-and-text-bg"])}>
      <div className={clsx("container-lg", "py-4", "text-primary")}>
        <div className={clsx("row", "py-2")}>
          <div className={clsx("col-md-5")}></div>
          <div className={clsx("col-md-7")}>
            <h3 className={clsx("heading-m", "py-2", styles["title-padding"])}>
              {props.title}
            </h3>
            <p className={clsx("py-2", "fs-5")}>{props.subTitle}</p>
            <Link asButton={true} buttonVariant="secondary" {...props.link} />
          </div>
        </div>
      </div>
    </div>
  );
};
