import type { LinkData } from "../../types/LinkData";

export interface ListItemProps extends LinkData {}

export interface MenuListProps {
  items: ListItemProps[];
  hasDivider?: boolean;
}
