import type { FC } from "react";
import clsx from "clsx";

import styles from "./ChapterList.module.scss";
import type { ChapterListProps } from "./ChapterList.interface";

export const ChapterList: FC<ChapterListProps> = (props) => {
  const startStr: string = "Start";

  const listItemDefaultClasses = clsx(
    "body-regular",
    "m-0",
    "pt-3",
    "pb-3",
    "ps-3",
    styles["chapter-list__list-group-item"],
  );

  return (
    <ul className={clsx("m-0", "p-0")}>
      {/* Always render the start string first */}
      <li
        className={clsx(
          listItemDefaultClasses,
          !props.activeChapterId && styles["active"],
          !props.activeChapterId && "fw-bold",
        )}
      >
        <a className={clsx("text-decoration-none")} href={props.parentUrl}>
          {startStr}
        </a>
      </li>
      {/* Loop through the chapters to make the rest of the links */}
      {props.chapters.map(({ id, title }) => (
        <li
          key={id}
          className={clsx(
            listItemDefaultClasses,
            styles["chapter-list__list-group-item"],
            id === props.activeChapterId && styles["active"],
            id === props.activeChapterId && "fw-bold",
          )}
        >
          <a
            className={clsx("text-decoration-none")}
            href={`${props.parentUrl}/${id}`}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};
