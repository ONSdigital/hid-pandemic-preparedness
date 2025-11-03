import type { Link } from "@localTypes/Link";
import type { NavItem } from "../../types/NavItem";

export interface BaseNavColumn {
  _uid: string;
  title: string;
  NavLink: Link[];
}

export interface MegaMenuProps {
  navItems: NavItem[];
}
