import type { FC } from "react";
import clsx from "clsx";

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
          href={props.parent.fullSlug}
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
          <a className={clsx("text-decoration-none")} href={chapter.fullSlug}>
            {chapter.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
