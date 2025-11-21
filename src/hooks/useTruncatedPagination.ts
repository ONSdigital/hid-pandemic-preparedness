import { useMemo } from "react";

export const useTruncatedPagination = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1,
) => {
  return useMemo(() => {
    const totalPageNumbers = totalPages + siblingCount * 2;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    // Define range
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 0);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages - 1,
    );

    // use left/right ELLIPSIS
    const shouldShowLeftEllipsis = leftSiblingIndex > 1;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 0;
    const lastPageIndex = totalPages - 1;

    // only displaying higher ellipsis
    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i);
      return [...leftRange, null, lastPageIndex];
    }

    // only displaying lower ellipsis
    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i,
      );
      return [firstPageIndex, null, ...rightRange];
    }

    // both higher and lower ellipsis showing
    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [firstPageIndex, null, ...middleRange, null, lastPageIndex];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);
};
