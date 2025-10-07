import type { ListItem } from "@localTypes/ListItem";
import type { NavItem } from "../../types/NavItem";

export interface ListGroupChecksProps {
  listItems: ListItem[];
  inverse?: boolean;
  onChange?: (id: string, parentId: string | undefined) => void; // eslint-disable-line no-unused-vars
  selectedIds?: string[];
  parentId?: string;
}

export interface ListGroupLinksProps {
  title?: string;
  href?: string;
  children?: NavItem[];
  inverse?: boolean;
}
