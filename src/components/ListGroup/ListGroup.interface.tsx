import type { FilterItem } from "../../types/FilterItem";
import type { NavItem } from "../../types/NavItem";

export interface ListGroupChecksProps {
  title?: string;
  checkItems: FilterItem[];
  inverse?: boolean;
}

export interface ListGroupLinksProps {
  title?: string;
  href?: string;
  children?: NavItem[];
  inverse?: boolean;
}
