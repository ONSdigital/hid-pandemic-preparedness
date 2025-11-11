import type { FC } from "react";
import clsx from "clsx";

import strings from "@src/content/strings.json";

import type { PaginatorProps } from "./Paginator.interface";
import styles from "./Paginator.module.scss";

export const Paginator: FC<PaginatorProps> = (props) => {
  // Calculate how many page items we need
  const totalPageItems: number = props.total / props.perPage;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {Array.from({ length: totalPageItems }).map((_, index) => (
          <li className="page-item">
            <a className="page-link" href="#">
              {index}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
