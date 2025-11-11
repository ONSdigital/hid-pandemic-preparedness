import { useState } from "react";
import type { FC, MouseEvent } from "react";
import clsx from "clsx";

import type { PaginatorProps } from "./Paginator.interface";

export const Paginator: FC<PaginatorProps> = (props) => {
  // Calculate how many page items we need
  const totalItems = props.items.length;
  const [currentPage, setCurrentPage] = useState(1);

  // Handler for clicking a page number
  const handleItemClick = (page: number, e: MouseEvent) => {
    e.preventDefault(); // Prevent default anchor behavior

    if (page >= 0 && page < totalItems) {
      setCurrentPage(page);
    }

    if (props.onSelect) {
      props.onSelect(props.items[page]);
    }
  };

  return (
    <nav aria-label={props.ariaLabel}>
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={(e) => handleItemClick(currentPage - 1, e)}
          >
            Previous
          </a>
        </li>
        {props.items.map((item, i) => (
          <li
            className={clsx("page-item", currentPage === i && "active")}
            key={item._uid}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => handleItemClick(i, e)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={(e) => handleItemClick(currentPage + 1, e)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
