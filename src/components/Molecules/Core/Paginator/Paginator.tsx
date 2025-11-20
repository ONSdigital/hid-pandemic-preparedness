import { type FC, type MouseEvent } from "react";
import clsx from "clsx";
import { ArrowButton } from "@src/components/ArrowButton/ArrowButton";
import type { PaginatorProps } from "./Paginator.interface";
import styles from "./Paginator.module.scss";

export const Paginator: FC<PaginatorProps> = ({
  ariaLabel,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const safeCurrentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

  const handlePageClick = (pageIndex: number, e?: MouseEvent) => {
    if (e) e.preventDefault();
    if (pageIndex >= 0 && pageIndex < totalPages) {
      onPageChange(pageIndex);
    }
  };

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <nav aria-label={ariaLabel}>
      <ul className={clsx("pagination", "justify-content-center", "gap-4")}>
        <li className={clsx("page-item", "px-1")}>
          <ArrowButton
            ariaLabel="Previous"
            direction="left"
            variant="inverse"
            type="button"
            onClick={() => handlePageClick(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 0}
          />
        </li>

        {pages.map((pageIndex) => (
          <li
            className={clsx(
              "page-item",
              safeCurrentPage === pageIndex && "active",
            )}
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
            variant="inverse"
            type="button"
            onClick={() => handlePageClick(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages - 1}
          />
        </li>
      </ul>
    </nav>
  );
};
