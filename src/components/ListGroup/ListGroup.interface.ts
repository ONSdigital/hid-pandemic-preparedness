import type { ChangeEvent } from "react";
import type { FilterItem } from "../../types/FilterItem";
import type { NavItem } from "../../types/NavItem";

export interface ListGroupChecksProps {
  title?: string;
  checkItems: FilterItem[];
  inverse?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
  selectedIds?: string[];
}
