import { useState, useMemo, useEffect } from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  initialPageIndex?: number;
}

export const usePagination = <T>({
  data,
  itemsPerPage,
  initialPageIndex = 0,
}: UsePaginationProps<T>) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const safeIndex = Math.max(0, Math.min(initialPageIndex, totalPages - 1));
    setCurrentPageIndex(safeIndex);
  }, [initialPageIndex, totalPages]);

  useEffect(() => {
    const safeIndex = Math.max(0, Math.min(currentPageIndex, totalPages - 1));
    if (currentPageIndex !== safeIndex) {
      setCurrentPageIndex(safeIndex);
    }
  }, [data.length, totalPages]);

  const currentItems = useMemo(() => {
    const start = currentPageIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [currentPageIndex, data, itemsPerPage]);

  const goToPage = (pageIndex: number) => {
    const newIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
    setCurrentPageIndex(newIndex);
    return newIndex;
  };

  return {
    currentPage: currentPageIndex,
    totalPages,
    currentItems,
    goToPage,
  };
};
