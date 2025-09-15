import type { LinkData } from "../../../types/LinkData";

export interface BreadcrumbProps {
  items: LinkData[];
}

export interface HeaderProps {
  breadcrumbs: BreadcrumbProps;
  title: string;
  subTitle: string;
  searchPlaceholderText: string;
}
