export interface PaginatorItem {
  _uid: string;
}

export interface PaginatorProps {
  ariaLabel: string;
  perPage?: number;

  items?: PaginatorItem[];
  selectedUid?: string;
  onSelect?: (selectedItem: PaginatorItem) => void; // eslint-disable-line no-unused-vars

  totalPages?: number;
  currentPage?: number;
  onPageChange?: (pageIndex: number) => void; // eslint-disable-line no-unused-vars
}
