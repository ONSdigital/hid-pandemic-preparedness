import { RiStarLine } from "@remixicon/react";
import clsx from "clsx";
import type { FC } from "react";

import { TextModule } from "@components/TextModule/TextModule";
import type { CongratulationsProps } from "./Congratulations.interface";
import styles from "./Congratulations.module.scss";

export const Congratulations: FC<CongratulationsProps> = (props) => {
  return (
    <div
      className={clsx(
        "text-center",
        "rounded",
        "py-4",
        "px-3",
        styles["congratulations-container"],
      )}
    >
      <h5
        className={clsx(
          "d-flex",
          "justify-content-center",
          "gap-1",
          "align-items-center",
        )}
      >
        <span className={clsx("d-flex", "align-items-center")}>
          <RiStarLine />
        </span>
        {props.title}
        <span className={clsx("d-flex", "align-items-center")}>
          <RiStarLine />
        </span>
      </h5>
      <TextModule htmlContent={props.htmlContent} />
    </div>
  );
};
