import { type FC, type MouseEvent } from "react";
import clsx from "clsx";
import { ArrowButton } from "@src/components/ArrowButton/ArrowButton";
import type { PaginatorProps } from "./Paginator.interface";
import styles from "./Paginator.module.scss";

export const Paginator: FC<PaginatorProps> = (props) => {
  const items = props.items;

  const totalPages = items ? items.length : props.totalPages || 0;

  let activeIndex = 0;

  if (items) {
    activeIndex = props.selectedUid
      ? items.findIndex((item) => item._uid === props.selectedUid)
      : 0;
  } else {
    activeIndex = props.currentPage || 0;
  }

  if (activeIndex < 0) activeIndex = 0;
  if (activeIndex >= totalPages && totalPages > 0) activeIndex = totalPages - 1;

  const handlePageClick = (pageIndex: number, e?: MouseEvent) => {
    if (e) e.preventDefault();

    if (pageIndex >= 0 && pageIndex < totalPages) {
      if (items) {
        if (props.onSelect) {
          props.onSelect(items[pageIndex]);
        }
      } else {
        if (props.onPageChange) {
          props.onPageChange(pageIndex);
        }
      }
    }
  };

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <nav aria-label={props.ariaLabel}>
      <ul className={clsx("pagination", "justify-content-center", "gap-4")}>
        <li className={clsx("page-item", "px-1")}>
          <ArrowButton
            ariaLabel="Previous"
            direction="left"
            variant="secondary-inverse"
            type="button"
            onClick={() => handlePageClick(activeIndex - 1)}
            disabled={activeIndex === 0}
          />
        </li>

        {pages.map((pageIndex) => (
          <li
            className={clsx("page-item", activeIndex === pageIndex && "active")}
            key={pageIndex}
          >
            <a
              className={clsx("page-link", "fw-bold", styles["page-link"])}
              href="#"
              onClick={(e) => handlePageClick(pageIndex, e)}
            >
              {pageIndex + 1}
            </a>
          </li>
        ))}

        <li className={clsx("page-item", "px-1")}>
          <ArrowButton
            ariaLabel="Next"
            direction="right"
            variant="secondary-inverse"
            type="button"
            onClick={() => handlePageClick(activeIndex + 1)}
            disabled={activeIndex === totalPages - 1}
          />
        </li>
      </ul>
    </nav>
  );
};
