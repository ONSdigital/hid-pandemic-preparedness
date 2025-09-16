import clsx from "clsx";
import type { FC } from "react";

import type { IntroductionProps } from "./Introduction.interface";
import styles from "./Introduction.module.scss";

export const Introduction: FC<IntroductionProps> = (props) => {
  const jumpToString: string = "Jump to";

  return (
    <div className={clsx("container")}>
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
        <ul>
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

// <div className={clsx("w-100", styles["header-bg"])}>
//   <div className={clsx("container-lg", "py-4", "text-light")}>
//     <div className={clsx("row")}>
//       <div className={clsx("col")}>
//         <Breadcrumb {...props.breadcrumbs} />
//       </div>
//     </div>
//     <div className={clsx("row")}>
//       <div className={clsx("col")}>
//         <h1 className={clsx("heading-l")}>{props.title}</h1>
//       </div>
//     </div>
//   </div>
// </div>
