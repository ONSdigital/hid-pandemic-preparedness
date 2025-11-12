import type { FC } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

import { Accordion } from "@src/components/Molecules/Core/Accordion/Accordion";
import { ChapterList } from "@src/components/Molecules/Core/ChapterList/ChapterList";
import { IconAndTextLink } from "@src/components/IconAndTextLink/IconAndTextLink";

import strings from "@src/content/strings.json";

import type { ThemeFilterProps } from "./ThemeFilter.interface";
import styles from "./ThemeFilter.module.scss";

export const ThemeFilter: FC<ThemeFilterProps> = (props) => {
  const accordionId = uuidv4();

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
                  <div className={clsx("accordion-item")}>
                    <h2 className={clsx("accordion-header")}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${theme._uid}`}
                        aria-expanded="true"
                        aria-controls={`collapse${theme._uid}`}
                      >
                        {theme.title}
                      </button>
                    </h2>
                    <div
                      id={`collapse${theme._uid}`}
                      className={clsx("accordion-collapse", "collapse", "show")}
                      data-bs-parent={`#${accordionId}`}
                    >
                      <div className={clsx("accordion-body")}>
                        {theme.subThemes && (
                          <ul
                            className={clsx("list-group", "list-group-flush")}
                          >
                            {theme.subThemes.map((subTheme) => (
                              <li
                                className={clsx("list-group-item")}
                                key={subTheme._uid}
                              >
                                <div className={clsx("form-check")}>
                                  <input
                                    className={clsx("form-check-input")}
                                    type="checkbox"
                                    id={subTheme._uid}
                                  />
                                  <label
                                    className={clsx("form-check-label")}
                                    htmlFor={subTheme._uid}
                                  >
                                    {subTheme.title}
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
