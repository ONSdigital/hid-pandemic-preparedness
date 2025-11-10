import clsx from "clsx";
import type { FC } from "react";

import { SubTheme } from "@src/components/Organisms/FilterableResources/SubTheme/SubTheme";

import styles from "./Theme.module.scss";
import type { ThemeProps } from "./Theme.interface";

export const Theme: FC<ThemeProps> = (props) => {
  return (
    <>
      <div className={clsx("p-4", "border", "rounded", styles["theme-bg"])}>
        <div className={clsx("d-flex", "py-4")}>
          <h3 className={clsx("heading-m")}>{props.title}</h3>
        </div>
        <hr />
        <div className={clsx("d-flex", "py-4")}>
          <p>{props.subTitle}</p>
        </div>
      </div>
      {props.subThemes &&
        props.subThemes.map((subTheme) => (
          <div className={clsx("py-4")}>
            <SubTheme {...subTheme} parentTheme={props.title} />
          </div>
        ))}
    </>
  );
};
