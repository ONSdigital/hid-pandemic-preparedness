import clsx from "clsx";
import { isEqual } from "lodash";
import { useState } from "react";
import type { FC } from "react";

import { Paginator } from "@src/components/Molecules/Core/Paginator/Paginator";
import { Theme as ThemeComponent } from "@src/components/Organisms/FilterableResources/Theme/Theme";
import { ThemeFilter } from "@src/components/Organisms/FilterableResources/ThemeFilter/ThemeFilter";
import type { Theme } from "@src/types/bloks/storyblok-components";

import type { FilterableResourcesProps } from "@src/components/Organisms/FilterableResources/FilterableResources/FilterableResources.interface";

import strings from "@src/content/strings.json";

import styles from "./FilterableResources.module.scss";

export const FilterableResources: FC<FilterableResourcesProps> = (props) => {
  const filterableResourcesStrings =
    strings.filterableResources.filterableResources;

  // Initialize filteredThemes state with all themes initially
  const [filteredThemes, setFilteredThemes] = useState<Theme[]>(
    props.resources ?? [],
  );

  // Handler to updated filteredThemes, with check to ensure they've been updated to avoid
  // recursive rendering loop
  const handleFilteredThemesChange = (updatedThemes: Theme[]) => {
    console.log("handleFilteredThemesChange called");
    setFilteredThemes((current) => {
      if (isEqual(current, updatedThemes)) {
        console.log("Filtered themes unchanged, skipping update");
        return current;
      }
      console.log("Filtered themes changed, updating state");
      return updatedThemes;
    });
  };

  return (
    <div className={clsx("w-100", styles["filterable-resources-bg"])}>
      <div className={clsx("container-lg", "py-4")}>
        <div className={clsx("row")}>
          <div className={clsx("col-md-3", "mb-3")}>
            <ThemeFilter
              themes={props.resources}
              onFilteredThemesChange={handleFilteredThemesChange}
            />
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            {filteredThemes &&
              filteredThemes.map((theme) => (
                <ThemeComponent {...theme} key={theme._uid} />
              ))}
            {filteredThemes && (
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
