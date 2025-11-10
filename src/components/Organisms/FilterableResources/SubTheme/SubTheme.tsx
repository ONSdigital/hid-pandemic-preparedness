import clsx from "clsx";
import type { FC } from "react";

import { Tag } from "@/src/components/Molecules/Core/Tag/Tag";
import { FilterableResourcesItem } from "@src/components/Molecules/FilterableResources/FilterableResourcesItem/FilterableResourcesItem";

import type { SubThemeProps } from "./SubTheme.interface";
import styles from "./SubTheme.module.scss";

export const SubTheme: FC<SubThemeProps> = (props) => {
  return (
    <div className={clsx("p-4", "border", "rounded", styles["sub-theme-bg"])}>
      <div className={clsx("d-inline-flex", "pt-4", "pb-2", "mw-100")}>
        {props.parentTheme && <Tag title={props.parentTheme} />}
      </div>
      <hr />
      <div className={clsx("d-flex", "py-4")}>
        <h5 className={clsx("heading-xs")}>{props.title}</h5>
      </div>
      <div className={clsx("d-flex", "flex-column", "gap-2")}>
        {props.items &&
          props.items.map((item) => (
            <FilterableResourcesItem key={item._uid} {...item} />
          ))}
      </div>
    </div>
  );
};
