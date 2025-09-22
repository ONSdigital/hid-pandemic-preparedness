import type { BreadcrumbProps } from "../../Molecules/Breadcrumb/Breadcrumb.interface";

export interface HeaderProps {
  breadcrumbs: BreadcrumbProps;
  title: string;
  subTitleTop: string;
  subTitleBtm: string;
  searchPlaceholderText: string;
}
