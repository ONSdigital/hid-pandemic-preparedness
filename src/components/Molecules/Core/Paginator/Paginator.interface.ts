export interface PaginatorItem {
  _uid: string;
}

export interface PaginatorProps {
  ariaLabel: string;
  items: PaginatorItem[];
  perPage: number;
  onSelect?: (selectedItem: PaginatorItem) => void; // eslint-disable-line no-unused-vars
  selectedUid?: string;
}
