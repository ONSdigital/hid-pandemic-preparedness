import type { Link } from "@localTypes/Link";

export interface FooterProps {
  columns: FooterColumn[];
  className?: string;
}

interface FooterColumn {
  _uid: string;
  title?: string;
  links: FooterColumnLink[];
}

interface FooterColumnLink {
  _uid: string;
  link: Link;
}
export type FooterColumnTitleProps = Pick<FooterColumn, "title">;

export type FooterColumnLinksProps = Pick<FooterColumn, "links">;
