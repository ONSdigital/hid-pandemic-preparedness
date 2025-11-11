import { useState } from "react";
import type { FC, MouseEvent } from "react";
import clsx from "clsx";

import { ArrowButton } from "@src/components/ArrowButton/ArrowButton";

import type { PaginatorProps } from "./Paginator.interface";
import styles from "./Paginator.module.scss";

export const Paginator: FC<PaginatorProps> = (props) => {
  // Calculate how many page items we need
  const totalItems = props.items.length;
  const [currentPage, setCurrentPage] = useState(0);

  // Handler for clicking a page number
  const handleItemClick = (page: number, e?: MouseEvent) => {
    if (e) {
      e.preventDefault(); // Prevent default anchor behavior
    }

    if (page >= 0 && page < totalItems) {
      setCurrentPage(page);
      if (props.onSelect) {
        props.onSelect(props.items[page]);
      }
    }
  };

  return (
    <nav aria-label={props.ariaLabel}>
      <ul className={clsx("pagination", "d-flex", "align-items-center")}>
        <li className={clsx("page-item", "mx-2")}>
          <ArrowButton
            ariaLabel="Previous"
            direction="left"
            variant="secondary"
            type="button"
            onClick={() => handleItemClick(currentPage - 1)}
          />
        </li>
        {props.items.map((item, i) => (
          <li
            className={clsx("page-item", "mx-2", currentPage === i && "active")}
            key={item._uid}
          >
            <a
              className={clsx("page-link", "fw-bold", styles["page-link"])}
              href="#"
              onClick={(e) => handleItemClick(i, e)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <ArrowButton
            ariaLabel="Next"
            direction="right"
            variant="secondary"
            type="button"
            onClick={() => handleItemClick(currentPage + 1)}
          />
        </li>
      </ul>
    </nav>
  );
};
