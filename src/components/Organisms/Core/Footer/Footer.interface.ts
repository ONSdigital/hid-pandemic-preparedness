import type { LinkComponent } from "@localTypes/LinkComponent";

export interface FooterProps {
  columns: FooterColumn[];
}

interface FooterColumn {
  _uid: string;
  title?: string;
  links: LinkComponent[];
}

export type FooterColumnTitleProps = Pick<FooterColumn, "title">;

export type FooterColumnLinksProps = Pick<FooterColumn, "links">;
