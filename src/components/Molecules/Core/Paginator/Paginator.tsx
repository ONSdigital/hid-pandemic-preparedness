import { useEffect, useState } from "react";
import type { FC, MouseEvent } from "react";
import clsx from "clsx";

import { ArrowButton } from "@src/components/ArrowButton/ArrowButton";

import type { PaginatorProps } from "./Paginator.interface";
import styles from "./Paginator.module.scss";

export const Paginator: FC<PaginatorProps> = (props) => {
  const totalItems = props.items.length;

  // Find index of selected item by uid
  const selectedIndex = props.selectedUid
    ? props.items.findIndex((item) => item._uid === props.selectedUid)
    : -1;

  const [currentPage, setCurrentPage] = useState(
    selectedIndex >= 0 ? selectedIndex : 0,
  );

  // Sync internal currentPage when selectedUid changes
  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex !== currentPage) {
      setCurrentPage(selectedIndex);
    }
  }, [selectedIndex, currentPage]);

  const handleItemClick = (page: number, e?: MouseEvent) => {
    if (e) e.preventDefault();
    if (page >= 0 && page < totalItems) {
      setCurrentPage(page);
      if (props.onSelect) props.onSelect(props.items[page]);
    }
  };

  return (
    <nav aria-label={props.ariaLabel}>
      <ul className={clsx("pagination", "justify-content-center", "gap-4")}>
        <li className={clsx("page-item", "px-1")}>
          <ArrowButton
            ariaLabel="Previous"
            direction="left"
            variant="secondary-inverse"
            type="button"
            onClick={() => handleItemClick(currentPage - 1)}
          />
        </li>
        {props.items.map((item, i) => (
          <li
            className={clsx("page-item", currentPage === i && "active")}
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
        <li className={clsx("page-item", "px-1")}>
          <ArrowButton
            ariaLabel="Next"
            direction="right"
            variant="secondary-inverse"
            type="button"
            onClick={() => handleItemClick(currentPage + 1)}
          />
        </li>
      </ul>
    </nav>
  );
};
