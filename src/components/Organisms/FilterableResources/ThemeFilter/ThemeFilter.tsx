import clsx from "clsx";
import { useEffect, useMemo } from "react";
import type { FC, MouseEvent } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import type { Theme } from "@src/types/bloks/storyblok-components";

import { IconAndTextLink } from "@src/components/Molecules/Core/IconAndTextLink/IconAndTextLink";

import strings from "@src/content/strings.json";

import type {
  SubThemeItemProps,
  ThemeFilterProps,
  ThemeItemProps,
} from "./ThemeFilter.interface";
import styles from "./ThemeFilter.module.scss";

// Reusuable component for a sub theme item
const SubThemeItem: FC<SubThemeItemProps> = (props) => {
  return (
    <li
      className={clsx("list-group-item", styles["list-group-item"])}
      key={props.subTheme._uid}
    >
      <div className={clsx("form-check")}>
        <Controller
          control={props.control}
          name={props.subTheme._uid}
          render={({ field }) => (
            <>
              <input
                className={clsx("form-check-input")}
                type="checkbox"
                id={props.subTheme._uid}
                {...field}
                checked={field.value || false}
              />
              <label
                className={clsx("form-check-label", field.value && "fw-bold")}
                htmlFor={props.subTheme._uid}
              >
                {props.subTheme.title}
              </label>
            </>
          )}
        />
      </div>
    </li>
  );
};

// Reusuable component for a theme item
const ThemeItem: FC<ThemeItemProps> = (props) => {
  const themeFilterStrings = strings.filterableResources.themeFilter;

  // Watch all subTheme checkbox values for this theme
  const subThemeKeys = useMemo(() => {
    return props.theme.subThemes?.map((subTheme) => subTheme._uid) ?? [];
  }, [props.theme.subThemes, props.theme._uid]);

  const values = useWatch({
    control: props.control,
    name: subThemeKeys,
  });

  // Determine if any are selected
  const anySelected = useMemo(() => {
    if (!values || values.length === 0) return false;
    return values.some(Boolean);
  }, [values]);

  // Count number selected
  const numberSelected = useMemo(() => {
    if (!values || values.length === 0) return 0;
    return values.filter(Boolean).length;
  }, [values]);

  const handleSelectAllToggle = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!props.theme.subThemes) return;

    subThemeKeys.forEach((key) => {
      props.setValue(key, !anySelected);
    });
  };

  return (
    <div className={clsx("accordion-item", "py-2", "border", "border-0")}>
      <h2
        className={clsx("accordion-header")}
        id={`heading${props.theme._uid}`}
      >
        <button
          className={clsx(
            "accordion-button",
            "py-2",
            "border-bottom",
            "collapsed",
            styles["accordion-button"],
          )}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${props.theme._uid}`}
          aria-expanded={false}
          aria-controls={`collapse${props.theme._uid}`}
        >
          {props.theme.title} {numberSelected > 0 && <>({numberSelected})</>}
        </button>
      </h2>
      <div
        id={`collapse${props.theme._uid}`}
        className={clsx("accordion-collapse", "collapse")}
        aria-labelledby={`heading${props.theme._uid}`}
      >
        <div className={clsx("accordion-body", "px-1")}>
          {props.theme.subThemes && (
            <>
              <a
                className={clsx(
                  "link-underline",
                  "link-underline-opacity-0",
                  "link-underline-opacity-100-hover",
                  "fw-bold",
                )}
                href="#"
                onClick={handleSelectAllToggle}
              >
                {anySelected
                  ? themeFilterStrings.selectNone
                  : themeFilterStrings.selectAll}
              </a>
              <ul className={clsx("list-group", "list-group-flush")}>
                {props.theme.subThemes.map((subTheme) => (
                  <SubThemeItem
                    subTheme={subTheme}
                    key={subTheme._uid}
                    control={props.control}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ThemeFilter: FC<ThemeFilterProps> = (props) => {
  const accordionId = uuidv4();
  const themeFilterStrings = strings.filterableResources.themeFilter;

  // Build a flat list of all subTheme IDs for easier form registration
  const allSubThemeIds =
    props.themes?.flatMap(
      (theme) => theme.subThemes?.map((subTheme) => subTheme._uid) ?? [],
    ) ?? [];

  const { control, watch, setValue } = useForm<{ [key: string]: boolean }>({
    defaultValues: allSubThemeIds.reduce(
      (acc, id) => {
        acc[id] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  });

  // Watch all checkbox values
  const formValues = watch();

  // Compute filteredThemes whenever formValues or props.themes change
  const filteredThemes = useMemo(() => {
    if (!props.themes) return [];

    let filteredThemes: Theme[] = [];

    // Loop through each theme, and if any subThemes are selected add to filteredThemes
    props.themes.map((theme) => {
      const selectedSubThemes = (theme.subThemes ?? []).filter((subTheme) => {
        return formValues[subTheme._uid];
      });

      if (selectedSubThemes.length > 0) {
        filteredThemes.push({
          ...theme,
          subThemes: selectedSubThemes,
        });
      }
    });
    return filteredThemes;
  }, [formValues, props.themes]);

  // Callback to update filteredThemes
  useEffect(() => {
    if (props.onFilteredThemesChange) {
      props.onFilteredThemesChange(filteredThemes);
    }
  }, [filteredThemes, props.onFilteredThemesChange]);

  // Reset all filters
  const resetAllFilters = () => {
    allSubThemeIds.forEach((id) => {
      setValue(id, false);
    });
  };

  return (
    <div className="w-100">
      <div className={clsx(styles["container"])}>
        <div className={clsx("d-flex", "flex-column", "gap-3", "mb-5")}>
          <IconAndTextLink
            asset={props.file}
            icon="download"
            label={themeFilterStrings.downloadAll}
          />
          <IconAndTextLink
            icon="restart"
            label={themeFilterStrings.resetFilters}
            onClick={(e) => {
              e.preventDefault();
              resetAllFilters();
            }}
          />
        </div>
        <div className={clsx("d-flex", "flex-column")}>
          {props.themes && (
            <>
              <h1 className={clsx("heading-xs", "fw-bold", "mb-3")}>
                {themeFilterStrings.themes}
              </h1>
              <div
                className={clsx("accordion", "accordion-flush")}
                id={accordionId}
              >
                {props.themes.map((theme) => (
                  <ThemeItem
                    key={theme._uid}
                    theme={theme}
                    control={control}
                    setValue={setValue}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
