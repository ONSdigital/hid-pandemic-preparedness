import type { FC } from "react";
import clsx from "clsx";

import { sanitizeUrl } from "@src/helpers/sanitizeUrl";

import styles from "./ChapterList.module.scss";
import type { ChapterListProps } from "./ChapterList.interface";

export const ChapterList: FC<ChapterListProps> = (props) => {
  const listItemDefaultClasses = clsx(
    "m-0",
    "pt-3",
    "pb-3",
    "ps-3",
    styles["chapter-list__list-group-item"],
  );

  return (
    <ul className={clsx("m-0", "p-0")}>
      {/* Always render the parent item first */}
      <li
        className={clsx(
          listItemDefaultClasses,
          props.parent.fullSlug === props.activeChapterSlug && [
            styles["active"],
            "fw-bold",
          ],
        )}
      >
        <a
          className={clsx("text-decoration-none")}
          // sanitizeUrl used here to make sure input `fullSlug` evaluates to a relative url
          href={sanitizeUrl(props.parent.fullSlug)}
        >
          {props.parent.title}
        </a>
      </li>
      {/* Loop through the chapters to make the rest of the links */}
      {props.chapters.map((chapter) => (
        <li
          key={chapter._uid}
          className={clsx(
            listItemDefaultClasses,
            styles["chapter-list__list-group-item"],
            chapter.fullSlug === props.activeChapterSlug && [
              styles["active"],
              "fw-bold",
            ],
          )}
        >
          <a
            className={clsx("text-decoration-none")}
            // sanitizeUrl used here to make sure input `fullSlug` evaluates to a relative url
            href={sanitizeUrl(chapter.fullSlug)}
          >
            {chapter.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
