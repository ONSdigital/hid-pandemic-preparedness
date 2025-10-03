import type { FC } from "react";
import clsx from "clsx";

import type { ListCheckBoxItemProps } from "./ListCheckBoxItem.interface";

export const ListCheckBoxItem: FC<ListCheckBoxItemProps> = (props) => {
  return (
    <li className={clsx("list-group-item")} key={props.id}>
      <div className={clsx("form-check")}>
        <input
          className={clsx("form-check-input")}
          type="checkbox"
          id={props.id}
        />
        <label className={clsx("form-check-label")} htmlFor={props.id}>
          {props.label}
        </label>
      </div>
      {props.subItems && (
        <ul className={clsx("list-group", "list-group-flush", "px-4")}>
          {props.subItems.map((subItem, index) => {
            return (
              <ListCheckBoxItem
                key={`${index}`}
                id={subItem.id}
                label={subItem.label}
                subItems={subItem.subItems}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};
