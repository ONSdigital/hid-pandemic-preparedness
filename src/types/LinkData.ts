export interface LinkData {
  id: string;
  href: string;
  label: string;
  disabled?: boolean;
  target?: "_self" | "_blank" | "_parent" | "_top";
}
