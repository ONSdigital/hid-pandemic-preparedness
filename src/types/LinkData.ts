export interface LinkData {
  href: string;
  label: string;
  id?: string;
  disabled?: boolean;
  target?: "_self" | "_blank" | "_parent" | "_top";
}
