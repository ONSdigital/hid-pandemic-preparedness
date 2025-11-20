import type { LinkData } from "../../types/LinkData";

export interface LinkProps extends LinkData {
  asButton?: boolean;
  buttonVariant?: "primary" | "secondary" | "inverse";
  textInverse?: boolean;
  className?: string;
  goBack?: boolean;
}
