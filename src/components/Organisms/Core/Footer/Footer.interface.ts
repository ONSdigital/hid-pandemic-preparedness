import type {
  Footer,
  FooterColumn,
} from "@src/types/bloks/storyblok-components";

export interface FooterProps extends Footer {}

export type FooterColumnTitleProps = Pick<FooterColumn, "title">;

export type FooterColumnLinksProps = Pick<FooterColumn, "links">;
