import clsx from "clsx";
import type { FC } from "react";
import { sentenceCase } from "sentence-case";

import { Breadcrumb } from "@components/Molecules/Core/Breadcrumb/Breadcrumb";
import { SearchBar } from "@components/Molecules/SearchBar/SearchBar";

import type { HeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";

export const Header: FC<HeaderProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["header-bg"])}>
      <div className={clsx("container-lg", "py-4", "text-light")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-6")}>
            <Breadcrumb {...props.breadcrumbs} />
          </div>
        </div>
        <div className={clsx("row")}>
          <div className={clsx("col-md-6")}>
            <h1 role={"header-title"} className={clsx("heading-xl")}>
              {sentenceCase(props.title)}
            </h1>
          </div>
        </div>
        <div className={clsx("row", "py-lg-4")}>
          <div className={clsx("col-md-6")}>
            <p>{props.subTitle}</p>
          </div>
        </div>
        <div className={clsx("row", "py-2")}>
          <div className={clsx("col-md-5")}>
            <SearchBar placeholder={props.searchPlaceholderText} />
          </div>
        </div>
      </div>
    </div>
  );
};
