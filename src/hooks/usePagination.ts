import { useState, useEffect, useMemo } from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  initialPage?: number;
}

export const usePagination = <T>({
  data,
  itemsPerPage,
  initialPage = 0,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    if (initialPage === 0) {
      setCurrentPage(0);
    }
  }, [data, initialPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [currentPage, data, itemsPerPage]);

  const goToPage = (pageIndex: number) => {
    const pageNumber = Math.max(0, Math.min(pageIndex, totalPages - 1));
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
  };
};
