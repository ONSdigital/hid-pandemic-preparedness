import { useEffect, useState } from "react";
import type { ChangeEvent, FC, MouseEvent } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

import type { Theme } from "@src/types/bloks/storyblok-components";

import { Accordion } from "@src/components/Molecules/Core/Accordion/Accordion";
import { ChapterList } from "@src/components/Molecules/Core/ChapterList/ChapterList";
import { IconAndTextLink } from "@src/components/IconAndTextLink/IconAndTextLink";

import strings from "@src/content/strings.json";

import type {
  SubThemeItemProps,
  ThemeFilterProps,
  ThemeItemProps,
} from "./ThemeFilter.interface";
import styles from "./ThemeFilter.module.scss";

// Reusuable component for a sub theme item
const SubThemeItem: FC<SubThemeItemProps> = (props) => {
  // Callback for when item has been checked/unchecked
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onToggle) {
      props.onToggle(props.subTheme._uid, e.target.checked);
    }
  };

  return (
    <li className={clsx("list-group-item")} key={props.subTheme._uid}>
      <div className={clsx("form-check")}>
        <input
          className={clsx("form-check-input")}
          type="checkbox"
          id={props.subTheme._uid}
          onChange={handleChange}
          checked={props.checked}
        />
        <label
          className={clsx("form-check-label")}
          htmlFor={props.subTheme._uid}
        >
          {props.subTheme.title}
        </label>
      </div>
    </li>
  );
};

// Reusuable component for a theme item
const ThemeItem: FC<ThemeItemProps> = (props) => {
  const [selectAll, setSelectAll] = useState(false);

  // State to track which subThemes are checked
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  // Initialize checkedMap when theme.subThemes changes
  useEffect(() => {
    if (props.theme.subThemes) {
      const initialMap: Record<string, boolean> = {};
      props.theme.subThemes.forEach((subTheme) => {
        initialMap[subTheme._uid] = false;
      });
      setCheckedMap(initialMap);
    }
  }, [props.theme.subThemes]);

  // Callback for when item has been checked/unchecked
  const handleSubThemeItemToggle = (uid: string, checked: boolean) => {
    setCheckedMap((prev) => {
      const newMap = { ...prev, [uid]: checked };
      // Call onChange with filtered theme if needed
      if (props.onChange && props.theme.subThemes) {
        const filteredSubThemes = props.theme.subThemes.filter(
          (sub) => newMap[sub._uid],
        );
        props.onChange({ ...props.theme, subThemes: filteredSubThemes });
      }
      return newMap;
    });
  };

  // Handler for Select all / Select none click
  const handleSelectAllToggle = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newSelectAll: boolean = !selectAll;

    // Call handleSubThemeItemToggle for each subTheme to reflect the change
    if (props.theme.subThemes) {
      props.theme.subThemes.forEach((sub) => {
        handleSubThemeItemToggle(sub._uid, newSelectAll);
      });
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className={clsx("accordion-item")}>
      <h2 className={clsx("accordion-header")}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${props.theme._uid}`}
          aria-expanded="true"
          aria-controls={`collapse${props.theme._uid}`}
        >
          {props.theme.title}
        </button>
      </h2>
      <div
        id={`collapse${props.theme._uid}`}
        className={clsx("accordion-collapse", "collapse", "show")}
      >
        <div className={clsx("accordion-body")}>
          {props.theme.subThemes && (
            <>
              <a href="#" onClick={handleSelectAllToggle}>
                {selectAll ? "Select none" : "Select all"}
              </a>
              <ul className={clsx("list-group", "list-group-flush")}>
                {props.theme.subThemes.map((subTheme) => (
                  <SubThemeItem
                    subTheme={subTheme}
                    key={subTheme._uid}
                    onToggle={handleSubThemeItemToggle}
                    checked={!!checkedMap[subTheme._uid]}
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
  const [filteredThemes, setFilteredThemes] = useState<Theme[]>([]);

  // Initialize filteredThemes when themes change
  useEffect(() => {
    if (props.themes) {
      // Set the themes but clear the subThemes as they should all be unselected initially
      const initialFilteredThemes: Theme[] = props.themes.map((theme) => ({
        ...theme,
        subThemes: [],
      }));
      setFilteredThemes(initialFilteredThemes);
      console.log(initialFilteredThemes);
    }
  }, [props.themes]);

  // Callback for when item has been checked/unchecked to show filtered themes
  const handleThemeOnChange = (filteredTheme: Theme) => {
    setFilteredThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme._uid === filteredTheme._uid
          ? { ...theme, subThemes: filteredTheme.subThemes }
          : theme,
      ),
    );
  };

  return (
    <div className="w-100">
      <div className={clsx(styles["learning-module-nav__container"])}>
        <div className={clsx("d-flex", "flex-column", "gap-3", "mb-5")}>
          <IconAndTextLink href="/" icon="pdf" label="Download all questions" />
          <IconAndTextLink href="/" icon="feedback" label="Reset filters" />
        </div>
        <div className={clsx("d-flex", "flex-column")}>
          {props.themes && (
            <>
              <h1 className={clsx("heading-xs", "fw-bold", "mb-3")}>Themes</h1>
              <div
                className={clsx("accordion", "accordion-flush")}
                id={accordionId}
              >
                {props.themes.map((theme) => (
                  <ThemeItem
                    theme={theme}
                    key={theme._uid}
                    onChange={handleThemeOnChange}
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
