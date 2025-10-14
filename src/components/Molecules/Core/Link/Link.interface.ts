import type { Link } from "@src/types/Link";

export interface LinkProps extends Link {
  asButton?: boolean;
  buttonVariant?:
    | "primary"
    | "primary-inverse"
    | "secondary"
    | "secondary-inverse";
  className?: string;
  disabled?: boolean;
  goBack?: boolean;
  textInverse?: boolean;
}
