import clsx from "clsx";
import type { FC } from "react";

import type {
  ListGroupChecksProps,
  ListGroupLinksProps,
} from "./ListGroup.interface";
// import styles from "./ListGroup.module.scss";

// Use when rendering a list of checkboxes
export const ListGroupChecks: FC<ListGroupChecksProps> = (props) => {
  // Set title and action styles based on inverse prop
  let itemActionStyle = "list-group-item-action";
  let titleStyle = "list-group-title";

  if (props.inverse) {
    itemActionStyle = `${itemActionStyle}--inverse`;
    titleStyle = `${titleStyle}--inverse`;
  }

  return (
    <div>
      {props.title && (
        <p className={clsx("text-primary", "fw-bold")}>{props.title}</p>
      )}
      <ul className={clsx("list-group", "list-group-flush")}>
        {props.checkItems.map((item) => (
          <li className={clsx("list-group-item")}>
            <div className={clsx("form-check")}>
              <input
                className={clsx("form-check-input")}
                type="checkbox"
                value=""
                id={item.id}
              />
              <label className={clsx("form-check-label")} htmlFor={item.id}>
                {item.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Use when rendering a list of links
export const ListGroupLinks: FC<ListGroupLinksProps> = (props) => {
  // Set title and action styles based on inverse prop
  let itemActionStyle = "list-group-item-action";
  let titleStyle = "list-group-title";

  if (props.inverse) {
    itemActionStyle = `${itemActionStyle}--inverse`;
    titleStyle = `${titleStyle}--inverse`;
  }
  return (
    <div>
      {props.title && (
        <p className={clsx("text-primary", "fw-bold")}>{props.title}</p>
      )}
      <div className={clsx("list-group", "list-group-flush")}>
        {props.children && (
          <>
            {props.children.map((child, index, arr) => (
              <>
                <a
                  className={clsx(
                    "list-group-item",
                    "list-group-item-action",
                    child.disabled && "disabled",
                  )}
                  href={child.href}
                  key={index}
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
