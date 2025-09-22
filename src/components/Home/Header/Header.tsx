import clsx from "clsx";
import type { FC } from "react";

import { Breadcrumb } from "../../Molecules/Breadcrumb/Breadcrumb";
import SearchBar from "../../SearchBar/SearchBar";
import type { HeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";

export const Header: FC<HeaderProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["header-bg"])}>
      <div
        className={clsx(
          "container-lg",
          styles["header-container"],
          "py-4",
          "text-light",
        )}
      >
        <div className={clsx("row")}>
          <div className={clsx("col-md-7")}>
            <Breadcrumb {...props.breadcrumbs} />
          </div>
        </div>
        <div className={clsx("row")}>
          <div className={clsx("col-md-7")}>
            <h1 className={clsx("heading-xl")}>{props.title}</h1>
          </div>
        </div>
        <div className={clsx("row", "py-lg-4")}>
          <div className={clsx("col-md-7")}>
            <h4 className={clsx("heading-s")}>{props.subTitle}</h4>
          </div>
        </div>
        <div className={clsx("row", "py-2", "py-lg-4")}>
          <div className={clsx("col-md-6")}>
            <SearchBar placeholder={props.searchPlaceholderText} />
          </div>
        </div>
      </div>
    </div>
  );
};
