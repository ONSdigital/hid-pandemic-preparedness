import clsx from "clsx";
import type { FC } from "react";

import type { IntroductionProps } from "./Introduction.interface";
import strings from "@src/content/strings.json";
import styles from "./Introduction.module.scss";

export const Introduction: FC<IntroductionProps> = (props) => {
  return (
    <div
      className={clsx(
        "p-4",
        "p-lg-5",
        "border",
        "rounded-4",
        styles["introduction__container"],
      )}
    >
      <div className={clsx("row")}>
        <h4 className={clsx("heading-m", "mb-0")}>{props.title}</h4>
      </div>
      <hr className={clsx(styles["hr-m"])} />
      <div className={clsx("row")}>
        <p>{props.subTitle}</p>
      </div>
      {props.sectionLinks && (
        <div className={clsx("row")}>
          <h3 className={clsx("heading-s", "mb-3")}>
            {strings.unit.quickLinks}
          </h3>
          <ul className={clsx("ps-5")}>
            {props.sectionLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.url}`} className={clsx("text-link")}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
