import type { LinkData } from "../../../types/LinkData";

export interface BreadcrumbProps {
  items: LinkData[];
}

export interface HeaderProps {
  breadcrumbs: BreadcrumbProps;
  heading: string;
  subheading: string;
  description: string;
}
