export interface PaginatorProps {
  ariaLabel: string;
  totalPages: number;
  currentPage: number; // 0-based index
  onPageChange: (pageIndex: number) => void; // eslint-disable-line no-unused-vars
}
