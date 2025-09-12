import clsx from "clsx";
import type { FC } from "react";

import type { BreadcrumbProps, HeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";
import SearchBar from "../../SearchBar/SearchBar";

const Breadcrumb: FC<BreadcrumbProps> = (props) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className={clsx("breadcrumb")}>
        {props.items.map((item, index, arr) => (
          <li
            className={clsx(
              "breadcrumb-item",
              index === arr.length - 1 && "active",
            )}
            key={item.id}
          >
            <a className={clsx("link-light")} href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

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
          <div className={clsx("col-md-9")}>
            <Breadcrumb {...props.breadcrumbs} />
          </div>
        </div>
        <div className={clsx("row")}>
          <div className={clsx("col-md-9")}>
            <h1 className={clsx("heading-xl")}>{props.title}</h1>
          </div>
        </div>
        <div className={clsx("row", "py-lg-4")}>
          <div className={clsx("col-md-9")}>
            <h4 className={clsx("heading-s")}>{props.subTitle}</h4>
          </div>
        </div>
        <div className={clsx("row", "py-2", "py-lg-4")}>
          <div className={clsx("col-md-8")}>
            <SearchBar placeholder="Search learning resources" />
          </div>
        </div>
      </div>
    </div>
  );
};
