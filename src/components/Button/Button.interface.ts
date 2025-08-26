export interface ButtonProps {
  ariaLabel: string;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  label: string;
  selected?: boolean;
  type: "button" | "submit" | "reset";
  variant: "primary" | "primary-inverse" | "secondary" | "secondary-inverse";
}
