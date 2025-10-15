import clsx from "clsx";
import type { FC } from "react";

import type { BreadcrumbProps } from "./Breadcrumb.interface";

export const Breadcrumb: FC<BreadcrumbProps> = (props) => {
  return (
    <nav aria-title="breadcrumb">
      <ol className={clsx("breadcrumb")}>
        {props.items.map((item, index, arr) => (
          <li
            className={clsx(
              "breadcrumb-item",
              index === arr.length - 1 && "active",
            )}
            key={item.id}
            aria-current={index === arr.length - 1 && "page"}
          >
            {/* Don't render as link if last element in array */}
            {index === arr.length - 1 ? (
              item.title
            ) : (
              <a className={clsx("link-light")} href={item.url}>
                {item.title}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
