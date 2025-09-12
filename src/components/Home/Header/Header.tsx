import clsx from "clsx";
import type { FC } from "react";

import type { BreadcrumbProps, HeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";
import SearchBar from "../../SearchBar/SearchBar";
import type { arrayOutputType } from "astro:schema";

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
      <div className={clsx("container-lg")}>
        <div className={clsx("row", "text-light")}>
          <Breadcrumb {...props.breadcrumbs} />
        </div>
      </div>
    </div>
  );
};
