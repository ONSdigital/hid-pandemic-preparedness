import type { FC } from "react";
import clsx from "clsx";

import { Paginator } from "@src/components/Molecules/Core/Paginator/Paginator";
import { Theme } from "@src/components/Organisms/FilterableResources/Theme/Theme";
import { ThemeFilter } from "@src/components/Organisms/FilterableResources/ThemeFilter/ThemeFilter";

import type { FilterableResourcesProps } from "@src/components/Organisms/FilterableResources/FilterableResources/FilterableResources.interface";

import strings from "@src/content/strings.json";

import styles from "./FilterableResources.module.scss";

export const FilterableResources: FC<FilterableResourcesProps> = (props) => {
  const filterableResourcesStrings =
    strings.filterableResources.filterableResources;

  return (
    <div className={clsx("w-100", styles["filterable-resources-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3", "mb-3")}>
            <ThemeFilter themes={props.resources} />
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            {props.resources &&
              props.resources.map((theme) => (
                <Theme {...theme} key={theme._uid} />
              ))}
            {props.resources && (
              <Paginator
                ariaLabel={filterableResourcesStrings.themeNavigation}
                items={[]}
                perPage={1}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
