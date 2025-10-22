import type { Link } from "@localTypes/Link";
export interface FooterProps {
  columns: FooterColumn[];
}
interface FooterColumn extends FooterColumnTitleProps, FooterColumnLinksProps {
  _uid: string;
}
export interface FooterColumnTitleProps {
  title?: string;
}

export interface FooterColumnLinksProps {
  links: FooterColumnLink[];
}
interface FooterColumnLink {
  _uid: string;
  link: Link;
}
