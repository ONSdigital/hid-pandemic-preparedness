import type { BreadcrumbProps } from "@src/components/Molecules/Core/Breadcrumb/Breadcrumb.interface";
import type { ImageProps } from "@src/components/Molecules/Core/Image/Image.interface";

export interface HeaderProps {
  _uid: string;
  breadcrumbs: BreadcrumbProps;
  title: string;
  subTitle: string;
  searchPlaceholderText: string;
  image: ImageProps;
}
