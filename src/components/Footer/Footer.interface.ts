import type { Link } from "@/src/types/Link";
import type { MenuData } from "../../types/MenuData";

export interface FooterColumnLinksProps {
  links: Link[];
}

export interface FooterColumnTitleBlockProps {
  title?: string;
}

export interface FooterProps {
  columns: MenuData[];
}
