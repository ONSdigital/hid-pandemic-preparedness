import type { FC } from "react";
import styles from "./ListItem.module.scss";
import type { ListItemProps } from "./ListItem.interface";

const ListItem: FC<ListItemProps> = (props) => {
  return (
    <div className={styles["list-item"]}>
      <li className={styles["list-item__container"]}>{props.children}</li>
      {props.hasLine && <div className={styles["list-item__divider"]} />}
    </div>
  );
};

export default ListItem;
