import clsx from "clsx";
import type { FC } from "react";

import { SubTheme } from "@src/components/Organisms/FilterableResources/SubTheme/SubTheme";

import styles from "./Theme.module.scss";
import type { ThemeProps } from "./Theme.interface";

export const Theme: FC<ThemeProps> = (props) => {
  return (
    <>
      <div className={clsx("p-4", "p-lg-5", "border", "rounded", styles["theme-bg"])}>
        <h3 className={clsx("heading-m")}>{props.title}</h3>
        <hr className={clsx(styles["hr-m"])} />
        <div className={clsx("d-flex")}>
          <p>{props.subTitle}</p>
        </div>
      </div>
      {props.subThemes &&
        props.subThemes.map((subTheme) => (
          <div className={clsx("py-4")} key={subTheme._uid}>
            <SubTheme {...subTheme} parentTheme={props.title} />
          </div>
        ))}
    </>
  );
};
