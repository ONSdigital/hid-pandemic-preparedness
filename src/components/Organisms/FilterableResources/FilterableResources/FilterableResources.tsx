import clsx from "clsx";
import { useState } from "react";
import type { FC } from "react";

import type { FilterableResourcesProps } from "@src/components/Organisms/FilterableResources/FilterableResources/FilterableResources.interface";
import type { Theme } from "@src/types/bloks/storyblok-components";

import { Paginator } from "@src/components/Molecules/Core/Paginator/Paginator";
import { TextModule } from "@src/components/Molecules/Core/TextModule/TextModule";
import { Theme as ThemeComponent } from "@src/components/Organisms/FilterableResources/Theme/Theme";
import { ThemeFilter } from "@src/components/Organisms/FilterableResources/ThemeFilter/ThemeFilter";
import { usePagination } from "@src/hooks/usePagination";

import strings from "@src/content/strings.json";

import styles from "./FilterableResources.module.scss";

// Function that can be used to check whether two input arrays of `Theme` objects are equal based
// on their subtheme _uids
function themesAreEqual(a: Theme[], b: Theme[]): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i]._uid !== b[i]._uid) return false;

    const aSubs = a[i].subThemes ?? [];
    const bSubs = b[i].subThemes ?? [];

    if (aSubs.length !== bSubs.length) return false;

    for (let j = 0; j < aSubs.length; j++) {
      if (aSubs[j]._uid !== bSubs[j]._uid) return false;
    }
  }

  return true;
}

export const FilterableResources: FC<FilterableResourcesProps> = (props) => {
  const filterableResourcesStrings =
    strings.filterableResources.filterableResources;

  // Initialize filteredThemes state with all themes initially
  const [filteredThemes, setFilteredThemes] = useState<Theme[]>(
    props.resources ?? [],
  );

  const { currentItems, currentPage, totalPages, goToPage } = usePagination({
    data: filteredThemes,
    itemsPerPage: 1,
  });

  const activeTheme = currentItems.length > 0 ? currentItems[0] : null;

  const handleFilteredThemesChange = (updatedThemes: Theme[]) => {
    setFilteredThemes((current) => {
      if (themesAreEqual(current, updatedThemes)) {
        return current;
      }

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
              file={props.file}
              onFilteredThemesChange={handleFilteredThemesChange}
            />
          </div>
          <div className={clsx("col-md-9", "d-flex", "flex-column", "gap-4")}>
            {/* Empty State */}
            {props.explanation && filteredThemes.length === 0 && (
              <div
                className={clsx(
                  "p-4",
                  "border",
                  "rounded",
                  styles["explanation-bg"],
                )}
              >
                <div className={clsx("d-flex", "py-4")}>
                  <h3 className={clsx("heading-m")}>{props.resourceName}</h3>
                </div>
                <hr />
                <div className={clsx("d-flex", "py-4")}>
                  <TextModule richText={props.explanation} />
                </div>
              </div>
            )}

            {/* Active Theme Content */}
            {activeTheme && (
              <>
                <ThemeComponent {...activeTheme} />

                {/* Paginator */}
                {totalPages > 1 && (
                  <div
                    className={clsx("d-flex", "justify-content-center", "py-2")}
                  >
                    <Paginator
                      ariaLabel={filterableResourcesStrings.themeNavigation}
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={goToPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
