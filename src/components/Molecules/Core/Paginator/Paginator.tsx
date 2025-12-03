import { type FC, type MouseEvent } from "react";
import clsx from "clsx";
import { ArrowButton } from "@src/components/ArrowButton/ArrowButton";
import type { PaginatorProps } from "./Paginator.interface";
import styles from "./Paginator.module.scss";
import { useTruncatedPagination } from "@/src/hooks/useTruncatedPagination";

export const Paginator: FC<PaginatorProps> = ({
  ariaLabel,
  totalPages,
  currentPage,
  onPageChange,
  scrollToRef,
}) => {
  const safeCurrentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

  const handlePageClick = (pageIndex: number, e?: MouseEvent) => {
    if (e) e.preventDefault();
    if (pageIndex >= 0 && pageIndex < totalPages) {
      onPageChange(pageIndex);
    }

    if (scrollToRef?.current) {
      scrollToRef.current.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const truncatedPagination = useTruncatedPagination(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <nav aria-label={ariaLabel}>
      <ul
        className={clsx(
          "pagination",
          "justify-content-center",
          "justify-content-between",
          "justify-content-md-center",
          "align-items-center",
          "gap-2",
          "gap-md-4",
        )}
      >
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

        {/* Mobile view*/}
        <li className={clsx("page-item", "d-md-none")}>
          <span className={clsx("fw-bold", styles["mobile-paginator"])}>
            Page {safeCurrentPage + 1} of {totalPages}
          </span>
        </li>

        {/* Desktop View */}
        {truncatedPagination.map((pageIndex) => {
          if (pageIndex === null) {
            return (
              <li
                key={`dots-${pageIndex}`}
                className={clsx("page-item", "d-none", "d-md-block")}
              >
                <span className={styles["ellipsis"]}>&hellip;</span>
              </li>
            );
          }

          return (
            <li
              className={clsx(
                "page-item",
                "d-none",
                "d-md-block",
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
          );
        })}

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
