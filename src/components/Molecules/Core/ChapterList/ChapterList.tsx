import type { FC, MouseEventHandler } from "react";
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

  // Handle the click and add clicked id to the callback
  const handleClick =
    (selectedId: string): MouseEventHandler<HTMLAnchorElement> =>
    (e) => {
      e.preventDefault();

      if (props.onSelect) {
        props.onSelect(selectedId);
      }
    };

  return (
    <ul className={clsx("m-0", "p-0")}>
      {/* Loop through the chapters to make the links */}
      {props.chapters.map((chapter) => (
        <li
          key={chapter._uid}
          className={clsx(
            listItemDefaultClasses,
            styles["chapter-list__list-group-item"],
            chapter._uid === props.activeId && [styles["active"], "fw-bold"],
          )}
        >
          <a
            role="button"
            className={clsx("text-decoration-none", styles["link-color"])}
            href={void 0}
            onClick={handleClick(chapter._uid)}
          >
            {chapter.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
