import clsx from "clsx";
import type { FC } from "react";

import type { IntroductionProps } from "./Introduction.interface";
import styles from "./Introduction.module.scss";

export const Introduction: FC<IntroductionProps> = (props) => {
  const jumpToString: string = "Jump to";

  return (
    <div
      className={clsx(
        "container",
        "py-4",
        "border",
        "rounded",
        styles["border-color"],
      )}
    >
      <div className={clsx("row")}>
        <h3 className={clsx("heading-m")}>{props.title}</h3>
      </div>
      <hr />
      <div className={clsx("row")}>
        <p>{props.subTitle}</p>
      </div>
      <div className={clsx("row")}>
        <h4 className={clsx("heading-s")}>{`${jumpToString}:`}</h4>
      </div>
      <div className={clsx("row")}>
        <ul className={clsx("ps-5")}>
          {props.chapters.map((chapter) => (
            <li key={chapter.id}>
              <a href={chapter.href}>{chapter.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
