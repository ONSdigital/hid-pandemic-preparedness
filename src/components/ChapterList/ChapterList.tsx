import type { FC } from "react";
import clsx from "clsx";

import styles from "./ChapterList.module.scss";
import type { ChapterListProps } from "./ChapterList.interface";

export const ChapterList: FC<ChapterListProps> = (props) => {
  return (
    <ul className={clsx("m-0", "p-0")}>
      {props.chapters.map(({ id, title }) => (
        <li
          key={id}
          className={clsx(
            "body-regular",
            "m-0",
            "pt-3",
            "pb-3",
            "ps-3",
            styles["chapter-list__list-group-item"],
            id === props.activeId && styles["active"],
            id === props.activeId && "fw-bold",
          )}
        >
          <a className={clsx("text-decoration-none")} href={`/${id}`}>
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};
