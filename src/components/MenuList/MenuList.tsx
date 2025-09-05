import clsx from "clsx";
import type { FC } from "react";

import type { MenuListProps } from "./MenuList.interface";
import styles from "./MenuList.module.scss";

export const MenuList: FC<MenuListProps> = (props) => {
  return (
    <div>
      <h2 className={clsx("body", styles["menu-list__label"])}>
        {props.label}
      </h2>
      {props.children && (
        <ul>
          {props.children.map((child, index, arr) => (
            <li
              className={clsx("body", styles["menu-list__item"])}
              key={child.href}
            >
              <a href={child.href}>{child.label}</a>
              {/* Include divider except on last item */}
              {index !== arr.length - 1 && (
                <div className={styles["menu-list__divider"]} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
