import type { Link } from "@localTypes/Link";

export interface FooterProps {
  columns: FooterColumn[];
}

interface FooterColumn {
  _uid: string;
  title?: string;
  links: Link[];
}

export type FooterColumnTitleProps = Pick<FooterColumn, "title">;

export type FooterColumnLinksProps = Pick<FooterColumn, "links">;
