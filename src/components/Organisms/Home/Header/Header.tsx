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
      <div className={clsx("container-lg", "text-light")}>
        <div className={clsx("row")}>
          <div className={clsx("col-lg-6", "py-4", "z-1")}>
            <Breadcrumb {...props.breadcrumbs} />

            <h1 className={clsx("heading-xl")}>{sentenceCase(props.title)}</h1>
            <p className={clsx("py-lg-4")}>{props.subTitle}</p>

            <div className={clsx("col-xl-9", "pt-2")}>
              <SearchBar placeholder={props.searchPlaceholderText} />
            </div>
          </div>
          <div
            className={clsx(
              "col-lg-6",
              "position-relative",
              "d-flex",
              "flex-column",
              "justify-content-center",
            )}
          >
            <img
              src="/images/home-header-world-of-data.jpg"
              alt=""
              className={clsx(styles["header-image"])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
