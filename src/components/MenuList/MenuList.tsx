import type { FC } from "react";
import type { MenuListProps } from "./MenuList.interface";

export const MenuList: FC<MenuListProps> = (props) => {
  return (
    <div>
      <h2>{props.label}</h2>
      {props.children && (
        <ul>
          {props.children.map((child, index, arr) => (
            <li key={child.href}>
              <a href={child.href}>{child.label}</a>
              {/* Include divider except on last item */}
              {index !== arr.length - 1 && <hr />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
