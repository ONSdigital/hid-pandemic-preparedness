import { useState, type ChangeEvent, type FC } from "react";
import clsx from "clsx";

import { Paginator } from "@src/components/Molecules/Core/Paginator/Paginator";
import { Theme } from "@src/components/Organisms/FilterableResources/Theme/Theme";
import { ThemeFilter } from "@src/components/Organisms/FilterableResources/ThemeFilter/ThemeFilter";

import type { FilterableResourcesProps } from "@src/components/Organisms/FilterableResources/FilterableResources/FilterableResources.interface";

import styles from "./FilterableResources.module.scss";

export const FilterableResources: FC<FilterableResourcesProps> = (props) => {
  return (
    <div className={clsx("w-100", styles["filter-menu-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3", "mb-3")}>
            <ThemeFilter />
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            {props.resources &&
              props.resources.map((theme) => (
                <Theme {...theme} key={theme._uid} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
