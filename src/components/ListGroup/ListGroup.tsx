import clsx from "clsx";
import type { FC } from "react";

import type { ListGroupProps } from "./ListGroup.interface";
import styles from "./ListGroup.module.scss";

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
