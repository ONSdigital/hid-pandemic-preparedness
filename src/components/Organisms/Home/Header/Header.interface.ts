import type { BreadcrumbProps } from "@src/components/Molecules/Breadcrumb/Breadcrumb.interface";

export interface HeaderProps {
  _uid: string;
  breadcrumbs: BreadcrumbProps;
  title: string;
  subTitle: string;
  searchPlaceholderText: string;
}
