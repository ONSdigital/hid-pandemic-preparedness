import clsx from "clsx";
import type { FC } from "react";

import type {
  ListGroupChecksProps,
  ListGroupLinksProps,
} from "./ListGroup.interface";
import styles from "./ListGroup.module.scss";

// Use when rendering a list of checkboxes
export const ListGroupChecks: FC<ListGroupChecksProps> = (props) => {
  return (
    <ul
      className={clsx(
        "list-group",
        "list-group-flush",
        styles["list-group-checks"],
      )}
    >
      {props.listItems.map((item) => {
        // const isSelected =
        // props.selectedIds && props.selectedIds.includes(item.id);
        return (
          <li className={clsx("list-group-item")} key={item.id}>
            <div className={clsx("form-check")}>
              <input
                className={clsx("form-check-input")}
                type="checkbox"
                id={item.id}
                onChange={() =>
                  props.onChange && props.onChange(item.id, props.parentId)
                }
              />
              <label className={clsx("form-check-label")} htmlFor={item.id}>
                {item.label}
              </label>
            </div>
            {item.subItems && (
              <ListGroupChecks
                parentId={item.id}
                listItems={item.subItems}
                onChange={props.onChange}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

// Use when rendering a list of links
export const ListGroupLinks: FC<ListGroupLinksProps> = (props) => {
  let textColour: string = "text-primary";
  // Set text colour based on inverse prop
  if (props.inverse) {
    textColour = "text-light";
  }

  return (
    <div>
      {props.title && (
        <p className={clsx(textColour, "fw-bold")}>{props.title}</p>
      )}
      <div className={clsx("list-group", "list-group-flush")}>
        {props.children && (
          <>
            {props.children.map((child) => (
              <>
                <a
                  className={clsx(
                    "list-group-item",
                    "list-group-item-action",
                    styles["list-group-item-action-bg"],
                    textColour,
                    child.disabled && "disabled",
                  )}
                  href={child.href}
                  key={child.id}
                >
                  {child.label}
                </a>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
