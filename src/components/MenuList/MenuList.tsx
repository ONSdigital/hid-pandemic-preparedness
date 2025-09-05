import type { FC } from "react";
import styles from "./MenuList.module.scss";
import type { ListItemProps, MenuListProps } from "./MenuList.interface";

const dummyItems = [
  { href: "/page1", label: "Page 1" },
  { href: "/page2", label: "Page 2" },
  { href: "/page3", label: "Page 3" },
  { href: "/page4", label: "Page 4" },
  { href: "/page5", label: "Page 5" },
];

export const MenuListItem: FC<ListItemProps> = (props) => {
  return (
    <li className={styles["list-item__container"]}>
      <a href={props.href}>{props.label}</a>
    </li>
  );
};

export const MenuList: FC<MenuListProps> = (props) => {
  const lastMenuItemIndex = props.items.length - 1;

  return (
    <ul className={styles["list"]}>
      {props.items.map((item, index) => {
        return (
          <div key={item.href} className={styles["list-item-wrapper"]}>
            <MenuListItem {...item} />
            {props.hasDivider && index !== lastMenuItemIndex && (
              <div className={styles["list-item__divider"]} />
            )}
          </div>
        );
      })}
    </ul>
  );
};
