import type { NavItem } from "../../types/NavItem";

export interface NavBarProps {
  items: NavItem[];
  languages: Language[];
  selectedLanguage: Language;
}

export interface Language {
  id: string;
  label: string;
  href?: string;
}
