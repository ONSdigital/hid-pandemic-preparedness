import type { FC } from "react";
import clsx from "clsx";

import styles from "./ChapterList.module.scss";
import type { ChapterListProps } from "./ChapterList.interface";

export const ChapterList: FC<ChapterListProps> = (props) => {
  return (
    <ul className={clsx("heading-s", "m-0", "p-0")}>
      {props.chapters.map(({ id, title }) => (
        <li
          key={id}
          className={clsx(
            styles["chapter-list__list-group-item"],
            id === props.activeId && styles["active"],
          )}
        >
          <a
            className={clsx("link-underline-opacity-0, text-decoration-none")}
            href={`/${id}`}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};
