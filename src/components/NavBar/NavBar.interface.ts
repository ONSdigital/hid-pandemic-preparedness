export interface NavBarProps {
  items: NavItem[];
  languages: Language[];
  selectedLanguage: Language;
}

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
  disabled?: boolean;
}

export interface Language {
  id: string;
  label: string;
  href?: string;
}
