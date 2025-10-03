import type { ChangeEvent } from "react";
import type { ListItem } from "@localTypes/ListItem";
import type { NavItem } from "../../types/NavItem";

export interface ListGroupChecksProps {
  title?: string;
  checkItems: ListItem[];
  inverse?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
  selectedIds?: string[];
}

export interface ListGroupLinksProps {
  title?: string;
  href?: string;
  children?: NavItem[];
  inverse?: boolean;
}
