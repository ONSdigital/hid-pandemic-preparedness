import clsx from "clsx";
import type { FC } from "react";

import type { ListGroupProps, MenuListProps } from "./MenuList.interface";
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
            <>
              <li className={styles["menu-list__item"]} key={child.href}>
                <span className="body">{child.label}</span>
              </li>
              {index !== arr.length - 1 && (
                <div className={styles["menu-list__divider"]} />
              )}
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export const ListGroupLinks: FC<ListGroupProps> = (props) => {
  return (
    <div className={styles["list-group"]}>
      {props.title && (
        <h2 className={styles["list-group-title"]}>{props.title}</h2>
      )}
      {props.children && (
        <>
          {props.children.map((child, index, arr) => (
            <>
              <a
                className={clsx(
                  styles["list-group-item"],
                  styles["list-group-item-action"],
                )}
                href={child.href}
              >
                {child.label}
              </a>
              {index !== arr.length - 1 && (
                <div className={styles["list-group-divider"]} />
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};
