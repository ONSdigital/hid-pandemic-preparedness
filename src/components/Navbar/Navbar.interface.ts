import type { ReactNode } from "react";

import type { NavItem } from "../../types/NavItem";

export interface BrandProps {
  src: string;
}

export interface NavbarProps {
  brandComponent: ReactNode;
  navItems: NavItem[];
}
