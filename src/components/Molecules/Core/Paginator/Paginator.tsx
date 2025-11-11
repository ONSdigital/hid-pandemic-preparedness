import type { FC } from "react";
import clsx from "clsx";

import strings from "@src/content/strings.json";

import type { PaginatorProps } from "./Paginator.interface";
import styles from "./Paginator.module.scss";

function getPageItems(
  totalPages: number,
  currentPage: number,
  siblingCount = 1, // number of pages to show on each side of current page
  maxPageButtons = 7, // total buttons including first, last, ellipsis
): Array<string> {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    // Show all pages if total pages are less than max buttons
    return Array.from({ length: totalPages }, (_, i) => (i + 1).toString());
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPages - 1,
  );

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const pages: Array<string> = [];

  pages.push("1"); // first page always

  if (showLeftEllipsis) {
    pages.push("...");
  } else {
    for (let i = 2; i < leftSiblingIndex; i++) {
      pages.push(i.toString());
    }
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    pages.push(i.toString());
  }

  if (showRightEllipsis) {
    pages.push("...");
  } else {
    for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
      pages.push(i.toString());
    }
  }

  pages.push(totalPages.toString()); // last page always

  return pages;
}

export const Paginator: FC<PaginatorProps> = (props) => {
  const MAX_PAGE_ITEMS: number = 6;
  // Calculate how many page items we need
  const totalPageItems: number = Math.ceil(props.total / props.perPage);
  const pageItems = getPageItems(totalPageItems, 1);

  return (
    <nav aria-label={props.ariaLabel}>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {pageItems.map((item) => (
          <li className="page-item" key={item}>
            <a className="page-link" href="#">
              {item}
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
