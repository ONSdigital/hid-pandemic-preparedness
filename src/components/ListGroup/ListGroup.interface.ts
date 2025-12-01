import type { ChangeEvent } from "react";
import type { FilterItem } from "@src/types/FilterItem";
import type { LinkList } from "@src/types/LinkList";

export interface ListGroupChecksProps {
  title?: string;
  checkItems: FilterItem[];
  inverse?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
  selectedIds?: string[];
}

export interface ListGroupLinksProps extends LinkList {
  inverse?: boolean;
}
