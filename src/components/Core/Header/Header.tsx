import clsx from "clsx";
import type { FC } from "react";

import { Breadcrumb } from "../../Molecules/Breadcrumb/Breadcrumb";
import type { HeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";

export const Header: FC<HeaderProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["header-bg"])}>
      <div className={clsx("container-lg", "py-4", "text-light")}>
        <div className={clsx("row")}>
          <div className={clsx("col")}>
            <Breadcrumb {...props.breadcrumbs} />
          </div>
        </div>
        <div className={clsx("row")}>
          <div className={clsx("col")}>
            <h1 className={clsx("heading-l")}>{props.title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
