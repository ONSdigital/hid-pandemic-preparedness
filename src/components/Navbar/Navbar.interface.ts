import type { ReactNode } from "react";

import type { NavItem } from "../../types/NavItem";

export interface NavbarProps {
  brandComponent: ReactNode;
  navItems: NavItem[];
}
