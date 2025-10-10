import type { ListItem } from "@localTypes/ListItem";
import type { NavItem } from "@localTypes/NavItem";
import type { SelectedCheckboxes } from "@localTypes/SelectedCheckboxes";

export interface ListGroupChecksProps {
  listItems: ListItem[];
  inverse?: boolean;
  onChange?: (id: string, parentId: string | undefined) => void; // eslint-disable-line no-unused-vars
  checkedIds?: SelectedCheckboxes;
  parentId?: string;
}

export interface ListGroupLinksProps {
  title?: string;
  href?: string;
  children?: NavItem[];
  inverse?: boolean;
}
