import clsx from "clsx";
import type { FC } from "react";

import { Link } from "@components/Molecules/Core/Link/Link";

import type {
  ListGroupChecksProps,
  ListGroupLinksProps,
} from "./ListGroup.interface";
import styles from "./ListGroup.module.scss";

// Use when rendering a list of checkboxes
export const ListGroupChecks: FC<ListGroupChecksProps> = (props) => {
  return (
    <div>
      {props.title && (
        <p className={clsx("text-primary", "fw-bold")}>{props.title}</p>
      )}
      <ul className={clsx("list-group", "list-group-flush")}>
        {props.checkItems.map((item, index) => {
          const isSelected =
            props.selectedIds && props.selectedIds.includes(item.id);
          return (
            <li
              className={clsx("list-group-item")}
              key={`listGroupItem${index}`}
            >
              <div className={clsx("form-check")}>
                <input
                  className={clsx("form-check-input")}
                  type="checkbox"
                  id={item.id}
                  onChange={props.onChange}
                  checked={isSelected}
                />
                <label className={clsx("form-check-label")} htmlFor={item.id}>
                  {item.label}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Use when rendering a list of links
export const ListGroupLinks: FC<ListGroupLinksProps> = (props) => {
  // Set text colour based on inverse prop
  const textColour = props.inverse ? "text-light" : "text-primary";
  const hasLinks = props.links && props.links.length > 0;

  return (
    <div>
      {props.titleLink && (
        <Link
          hideIcon={true}
          label={props.titleLink.label}
          {...props.titleLink.link}
        />
      )}
      <div className={clsx("list-group", "list-group-flush")}>
        {hasLinks &&
          props.links.map((item) => (
            <Link
              key={item._uid}
              className={clsx(
                "list-group-item",
                "list-group-item-action",
                styles["list-group"],
                textColour,
              )}
              label={item.label}
              hideIcon={true}
              {...item.link}
            />
          ))}
      </div>
    </div>
  );
};
