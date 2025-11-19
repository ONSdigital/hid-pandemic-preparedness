export interface PaginatorItem {
  _uid: string;
}

interface BasePaginatorProps {
  ariaLabel: string;
  perPage?: number;
}

export interface ItemPaginatorProps extends BasePaginatorProps {
  items: PaginatorItem[];
  selectedUid?: string;
  onSelect?: (selectedItem: PaginatorItem) => void; // eslint-disable-line no-unused-vars

  totalPages?: never;
  currentPage?: never;
  onPageChange?: never;
}

export interface NumericPaginatorProps extends BasePaginatorProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageIndex: number) => void; // eslint-disable-line no-unused-vars

  items?: never;
  selectedUid?: never;
  onSelect?: never;
}

export type PaginatorProps = ItemPaginatorProps | NumericPaginatorProps;
