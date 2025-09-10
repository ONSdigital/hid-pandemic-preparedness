import type { LinkData } from "../../types/LinkData";

export interface LinkProps extends LinkData {
  asButton?: boolean;
  buttonVariant?:
    | "primary"
    | "primary-inverse"
    | "secondary"
    | "secondary-inverse";
  textInverse?: boolean;
  className?: string;
}
