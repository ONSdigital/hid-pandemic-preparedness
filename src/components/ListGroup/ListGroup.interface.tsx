import type { NavItem } from "../../types/NavItem";

export interface MenuListProps extends NavItem {}

export interface ListGroupProps {
  title?: string;
  href?: string;
  children?: NavItem[];
}
