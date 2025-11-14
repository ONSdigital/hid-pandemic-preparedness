import type { ChangeEvent } from "react";
import type { FilterItem } from "../../types/FilterItem";
import type { LinkList } from "@localTypes/LinkList";

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
